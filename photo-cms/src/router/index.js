import { createRouter, createWebHistory } from "vue-router";
import { getItem } from "../utils/storage";
import { TOKEN } from "../constants";
import Layout from "../layout/index.vue";

const privateRoutes = [
  {
    path: "/user",
    component: Layout,
    redirect: "/user/manage",
    meta: {
      title: "用户",
      icon: "User",
    },
    children: [
      {
        path: "/user/manage",
        name: "userManage",
        component: () => import("../pages/UserManagePage.vue"),
        meta: {
          title: "用户管理",
          icon: "Flag",
        },
      },
      {
        path: "/user/role",
        name: "userRole",
        component: () => import("../pages/RoleListPage.vue"),
        meta: {
          title: "角色列表",
          icon: "List",
        },
      },
      {
        path: "/user/permission",
        name: "userPermission",
        component: () => import("../pages/PermissionListPage.vue"),
        meta: {
          title: "权限列表",
          icon: "WarningFilled",
        },
      },
      {
        path: "/user/info/:id",
        name: "userInfo",
        component: () => import("../pages/UserInfoPage.vue"),
        meta: {
          title: "用户信息",
        },
      },
      {
        path: "/user/import",
        name: "import",
        component: () => import("../pages/ImportPage.vue"),
        meta: {
          title: "Excel导入",
        },
      },
    ],
  },
  {
    path: "/article",
    component: Layout,
    redirect: "/article/ranking",
    meta: {
      title: "文章",
      icon: "Notebook",
    },
    children: [
      {
        path: "/article/ranking",
        name: "articleRanking",
        component: () => import("../pages/ArticleRankingPage.vue"),
        meta: {
          title: "文章排名",
          icon: "TrendCharts",
        },
      },
      {
        path: "/article/:id",
        name: "articleDetail",
        component: () => import("../pages/ArticleDetailPage.vue"),
        meta: {
          title: "文章详情",
        },
      },
      {
        path: "/article/create",
        name: "articleCreate",
        component: () => import("../pages/ArticleCreatePage.vue"),
        meta: {
          title: "创建文章",
          icon: "EditPen",
        },
      },
      {
        path: "/article/editor/:id",
        name: "articleEditor",
        component: () => import("../pages/ArticleCreatePage.vue"),
        meta: {
          title: "文章编辑",
        },
      },
    ],
  },
];

const publicRoutes = [
  {
    path: "/login",
    component: () => import("../pages/LoginPage.vue"),
  },
  {
    path: "/",
    redirect: "/profile",
    component: Layout,
    children: [
      {
        path: "/profile",
        name: "profile",
        component: () => import("../pages/ProfilePage.vue"),
        meta: {
          title: "个人中心",
          icon: "Monitor",
        },
      },
      {
        path: "/404",
        name: "404",
        component: () => import("../pages/NotFoundPage.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...publicRoutes, ...privateRoutes],
});

// 白名单
const whiteList = ["/login"];
// 路由守卫
router.beforeEach((to, from, next) => {
  if (getItem(TOKEN)) {
    // 已登录
    if (to.path === "/login") {
      next("/");
    } else {
      next();
    }
  } else {
    // 未登录
    if (whiteList.includes(to.path)) {
      next();
    } else {
      next("/login");
    }
  }
});
export default router;
