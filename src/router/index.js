import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import LoginPage from "../pages/LoginPage.vue";
import { getToken } from "../utils/token";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage,
    },
    {
      path: "/profile/:uid",
      name: "profile",
      component: () => import("../pages/ProfilePage.vue"),
      props: true,
    },
    {
      path: "/profile/edit",
      name: "profileEdit",
      component: () => import("../pages/ProfileEdittingPage.vue"),
    },
    {
      path: "/posts/:id",
      name: "postDetail",
      component: () => import("../pages/PostDetailPage.vue"),
    },
    {
      path: "/posts/new",
      name: "postPush",
      component: () => import("../pages/PostPushPage.vue"),
    },
    {
      path: "/sponsor",
      name: "sponsor",
      component: () => import("../pages/SponsorPage.vue"),
    },
  ],
});

// 路由守卫
router.beforeEach((to) => {
  if (to.name !== "login" && !getToken()) {
    return { name: "login" };
  }
  if (to.name === "login" && getToken()) {
    return { name: "home" };
  }
});

export default router;
