import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Category from "../views/Category.vue";
import Details from "../views/Details.vue";
import NotFound from "../views/NotFound.vue"; // Import the 404 page
import AddBusiness from "../views/AddBusiness.vue";

const routes = [
    { path: "/", name: "Home", component: Home },
    { path: "/category/:category", name: "Category", component: Category, props: true },
    { path: "/details/:id", name: "Details", component: Details, props: true },
    { path: "/addbiz", name: "AddBusiness", component: AddBusiness },
    { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
  ];
  

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
