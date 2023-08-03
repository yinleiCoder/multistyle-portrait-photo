import { createRouter, createWebHistory } from "vue-router";

import HomePage from "../pages/HomePage.vue";
import SearchPage from "../pages/SearchPage.vue";
import LoginPage from "../pages/LoginPage.vue";
import ProfilePage from "../pages/ProfilePage.vue";
import ProfileEdittingPage from "../pages/ProfileEdittingPage.vue";
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
      path: "/search_result",
      name: "search_result",
      component: SearchPage,
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage,
    },
    {
      path: "/profile",
      name: "profile",
      component: ProfilePage,
    },
    {
      path: "/profile/edit",
      name: "profileEdit",
      component: ProfileEdittingPage,
    },
  ],
});

router.beforeEach(to => {
  if(to.name !== 'login' && !getToken()) {
    return {name: 'login'}
  }
  if(to.name === 'login' && getToken()) {
    return {name: 'home'}
  }
})

export default router;
