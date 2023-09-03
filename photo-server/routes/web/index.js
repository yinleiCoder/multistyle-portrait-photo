module.exports = (app) => {
  const express = require("express");
  const path = require("path");
  const jwt = require("jsonwebtoken");
  const assert = require("http-assert");
  const axios = require("axios");
  const router = express.Router({
    mergeParams: true,
  });
  const User = require("../../models/User");
  const Post = require("../../models/Post");
  const Comment = require("../../models/Comment");
  const Role = require("../../models/Role");
  const Priority = require("../../models/Priority");

  // 通用CRUD
  router.post("/", async (req, res) => {
    let model;
    if (req.Model.modelName === "Post") {
      model = await new Post({ ...req.body, owner: req.user._id }).save();
    } else {
      model = await req.Model.create(req.body);
    }
    res.send(model);
  });

  router.put("/:id", async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send(model);
  });

  router.delete("/:id", async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id);
    res.send({
      success: true,
    });
  });

  router.get("/", async (req, res) => {
    // 分页
    const { per_page = 10 } = req.query;
    const page = Math.max(req.query.page * 1, 1) - 1;
    const perPage = Math.max(per_page * 1, 1);
    // 模糊查询
    const q = new RegExp(req.query.q);
    const queryOptions = {};
    if (req.Model.modelName === "Post") {
      queryOptions.populate = "owner";
    }
    if (req.Model.modelName === "User") {
      queryOptions.populate = "roles";
    }
    const totalCount = await req.Model.countDocuments({
      $or: [{ username: q }, { title: q }, { content: q }],
    });
    const items = await req.Model.find({
      $or: [{ username: q }, { title: q }, { describe: q }, { content: q }],
    })
      .setOptions(queryOptions)
      .limit(perPage)
      .skip(page * perPage);
    res.send({
      total: totalCount,
      data: items,
    });
  });

  router.get("/:id", async (req, res) => {
    const { fields } = req.query;
    const selectFileds = fields
      .split(";")
      .filter((f) => f)
      .map((f) => " +" + f)
      .join("");
    const queryOptions = {};
    if (req.Model.modelName === "Post") {
      queryOptions.populate = "owner";
    }
    if (req.Model.modelName === "User") {
      queryOptions.populate = "roles";
    }
    if (req.Model.modelName === "Role") {
      queryOptions.populate = "priorities";
    }
    const model = await req.Model.findById(req.params.id)
      .select(selectFileds)
      .setOptions(queryOptions);
    res.send(model);
  });

  // middleware
  const authMiddleware = require("../../middlewares/auth");
  const resourceMiddleware = require("../../middlewares/resource");

  app.use(
    "/web/api/rest/:resource",
    authMiddleware(),
    resourceMiddleware(),
    router
  );

  // upload avatar
  const multer = require("multer");
  const upload = multer({ dest: path.join(__dirname, "../../uploads") });
  app.post(
    "/web/api/upload",
    authMiddleware(),
    upload.single("file"),
    async (req, res) => {
      const file = req.file;
      file.url = `http://localhost:3000/uploads/${file.filename}`;
      res.send(file);
    }
  );

  // login
  app.post("/web/api/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({
      username,
    }).select("+password");
    assert(user, 422, "用户不存在");
    const isValid = require("bcrypt").compareSync(password, user.password);
    assert(isValid, 422, "密码错误");
    const token = jwt.sign({ id: user._id }, app.get("secret"));
    res.send({
      user,
      token,
    });
  });

  // register
  app.post("/web/api/register", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({
      username,
    }).select("+password");
    assert(!user, 422, "用户已经注册");
    const newUser = await User.create(req.body);
    const token = jwt.sign({ id: newUser._id }, app.get("secret"));
    res.send({
      user: newUser,
      token,
    });
  });

  // 获取某个用户的关注人列表
  app.get("/web/api/:id/following", authMiddleware(), async (req, res) => {
    const user = await User.findById(req.params.id)
      .select("+following")
      .populate("following");
    assert(user, 422, "用户不存在");
    res.send({
      following: user.following,
    });
  });

  // 当前登录用户关注某人
  app.put("/web/api/following/:id", authMiddleware(), async (req, res) => {
    const me = await User.findById(req.user._id).select("+following");
    if (!me.following.map((id) => id.toString()).includes(req.params.id)) {
      me.following.push(req.params.id);
      me.save();
    }
    res.send({
      success: true,
    });
  });

  // 当前登录用户取消关注某人
  app.put("/web/api/unfollowing/:id", authMiddleware(), async (req, res) => {
    const me = await User.findById(req.user._id).select("+following");
    const index = me.following
      .map((id) => id.toString())
      .indexOf(req.params.id);
    if (index > -1) {
      me.following.splice(index, 1);
      me.save();
    }
    res.send({
      success: true,
    });
  });

  // 某个用户的粉丝列表
  app.get("/web/api/:id/followers", authMiddleware(), async (req, res) => {
    const users = await User.find({ following: req.params.id });
    res.send({
      followers: users,
    });
  });

  // 某个用户的帖子列表
  app.get("/web/api/:id/posts", authMiddleware(), async (req, res) => {
    const posts = await Post.find({ owner: req.params.id });
    res.send({
      uid: req.params.id,
      posts,
    });
  });

  // 某个用户赞过的帖子列表
  app.get("/web/api/:id/likingPosts", authMiddleware(), async (req, res) => {
    const user = await User.findById(req.params.id)
      .select("+likingPosts")
      .populate("likingPosts");
    assert(user, 422, "用户不存在");
    res.send({
      likingPosts: user.likingPosts,
    });
  });

  // 当前登录用户赞某帖子
  app.put("/web/api/likingPosts/:id", authMiddleware(), async (req, res) => {
    const me = await User.findById(req.user._id).select("+likingPosts");
    if (!me.likingPosts.map((id) => id.toString()).includes(req.params.id)) {
      me.likingPosts.push(req.params.id);
      me.save();
      await Post.findByIdAndUpdate(req.params.id, { $inc: { voteCount: 1 } });
    }
    res.send({
      success: true,
    });
  });

  // 当前登录用户取消赞某帖子
  app.put("/web/api/unlikingPosts/:id", authMiddleware(), async (req, res) => {
    const me = await User.findById(req.user._id).select("+likingPosts");
    const index = me.likingPosts
      .map((id) => id.toString())
      .indexOf(req.params.id);
    if (index > -1) {
      me.likingPosts.splice(index, 1);
      me.save();
      await Post.findByIdAndUpdate(req.params.id, { $inc: { voteCount: -1 } });
    }
    res.send({
      success: true,
    });
  });

  // 某条帖子下创建一条评论
  app.post(
    "/web/api/posts/:id/comments",
    authMiddleware(),
    async (req, res) => {
      const comments = await new Comment({
        ...req.body, // 若创建二级评论就加上replyTo和rootCommentId
        postId: req.params.id,
        commentator: req.user._id,
      }).save();
      res.send(comments);
    }
  );

  // 查询某个帖子下的全部评论
  app.get("/web/api/posts/:id/comments", authMiddleware(), async (req, res) => {
    const { rootCommentId } = req.query; // 二级评论
    const comments = await Comment.find({
      postId: req.params.id,
      rootCommentId,
    }).populate("commentator replyTo");
    res.send(comments);
  });

  // 为用户分配角色
  app.post("/web/api/assignRole/:userId", authMiddleware(), async (req, res) => {
    const { userId } = req.params;
    const { roleIds } = req.body;
    const user = await User.findById(userId);
    if (roleIds.length === 0) {
      user.roles = [];
    } else {
      roleIds.forEach((rid) => {
        user.roles.push(rid);
      });
    }
    await user.save();
    res.send({
      success: true,
    });
  });

  // 获取某个角色的权限

  // Google人类行为验证 https://developers.google.com/recaptcha/docs/verify
  app.post("/captcha", async (req, res) => {
    if (
      req.body["g-recaptcha-response"] === undefined ||
      req.body["g-recaptcha-response"] === "" ||
      req.body["g-recaptcha-response"] === null
    ) {
      res.send({
        success: false,
      });
      return;
    }

    const verificationURL = "https://www.google.com/recaptcha/api/siteverify";

    // siteKey: "6LdDWoQnAAAAAC5jdVS3cHg15CAKmp2r5hK2mQm-",
    // secretKey: "6LdDWoQnAAAAADljuk8I1YYV8EeLKYq85Evem1IF",
    const { data } = axios.post(verificationURL, {
      secret: "",
      response: "",
      remoteip: "",
    });
    res.send({
      success: data.success,
      challenge_ts: data.challenge_ts,
      hostname: data.hostname,
    });
  });

  // error handle
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message,
    });
  });
};
