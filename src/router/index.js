import { createWebHistory } from "vue-router";
import { createRouter } from "vue-router";
import RegisterForm from "../views/RegisterForm.vue";
import LoginForm from "../views/LoginForm.vue";
import HomePage from "../views/HomePage.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/Login",
    name: "Login",
    component: LoginForm,
  },
  {
    path: "/Register",
    name: "Register",
    component: RegisterForm,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      alert("You Don't have access !");
      next("/login");
    }
  } else {
    next();
  }
});
export default {
  router,
  getCurrentUser,
};
