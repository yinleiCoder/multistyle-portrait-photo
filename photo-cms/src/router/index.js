import { createRouter, createWebHistory } from "vue-router";
import Layout from "../layout/index.vue";
import { getItem } from "../utils/storage";
import { TOKEN } from "../constants";

/**
 * 动态路由菜单：
 * 1. 定义路由表定义动态路由菜单规则
 * 2. 根据规则制定路由表
 * 3. 根据规则依据路由表生成菜单
 * children是二级标签，同时有title和icon是要显示的菜单
 */
// 动态路由表
const privateRoutes = [
  {
    path: "/user",
    component: Layout,
    redirect: "/user/manage",
    meta: {
      title: "user",
      icon: "User",
    },
    children: [
      {
        path: "/user/manage",
        name: "userManage",
        component: () => import("../pages/UserManagePage.vue"),
        meta: {
          title: "userManage",
          icon: "Flag",
        },
      },
      {
        path: "/user/role",
        name: "userRole",
        component: () => import("../pages/RoleListPage.vue"),
        meta: {
          title: "userRoleList",
          icon: "List",
        },
      },
      {
        path: "/user/permission",
        name: "userPermission",
        component: () => import("../pages/PermissionListPage.vue"),
        meta: {
          title: "userPermissionList",
          icon: "WarningFilled",
        },
      },
      {
        path: "/user/info/:id",
        name: "userInfo",
        component: () => import("../pages/UserInfoPage.vue"),
        props: true,
        meta: {
          title: "userInfo",
        },
      },
      {
        path: "/user/import",
        name: "import",
        component: () => import("../pages/ExcelImportPage.vue"),
        meta: {
          title: "userExport",
        },
      },
    ],
  },
  {
    path: "/article",
    component: Layout,
    redirect: "/article/ranking",
    meta: {
      title: "article",
      icon: "Notebook",
    },
    children: [
      {
        path: "/article/ranking",
        name: "articleRanking",
        component: () => import("../pages/ArticleRankingPage.vue"),
        meta: {
          title: "articleRank",
          icon: "TrendCharts",
        },
      },
      {
        path: "/article/:id",
        name: "articleDetail",
        component: () => import("../pages/ArticleDetailPage.vue"),
        meta: {
          title: "articleDetail",
        },
      },
      {
        path: "/article/create",
        name: "articleCreate",
        component: () => import("../pages/ArticleCreatePage.vue"),
        meta: {
          title: "articleCreate",
          icon: "EditPen",
        },
      },
      {
        path: "/article/editor/:id",
        name: "articleEditor",
        component: () => import("../pages/ArticleCreatePage.vue"),
        meta: {
          title: "articleEdit",
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
          title: "profile",
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
  if (getItem(TOKEN)) {// 已登录
    if (to.path === "/login") {
      next("/");
    } else {
      next();
    }
  } else {// 未登录
    if (whiteList.includes(to.path)) {
      next();
    } else {
      next("/login");
    }
  }
});
export default router;
