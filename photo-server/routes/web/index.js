module.exports = (app) => {
  const express = require("express");
  const path = require("path");
  const jwt = require("jsonwebtoken");
  const assert = require("http-assert");
  const User = require("../../models/User");
  const router = express.Router({
    mergeParams: true,
  });

  // 通用CRUD
  router.post("/", async (req, res) => {
    const model = await req.Model.create(req.body);
    res.send(model);
  });

  router.put("/:id", async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
    res.send(model);
  });

  router.delete("/:id", async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id);
    res.send({
      success: true,
    });
  });

  router.get("/", async (req, res) => {
    const items = await req.Model.find().limit(10);
    res.send(items);
  });

  router.get("/:id", async (req, res) => {
    const model = await req.Model.findById(req.params.id);
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
      user,
      token,
    });
  });

  // error handle
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message,
    });
  });
};
