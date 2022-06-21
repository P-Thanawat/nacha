import Vue from "vue";
import App from "./App.vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "bootstrap-vue/dist/bootstrap-vue-icons.min.css";
import { BootstrapVue, IconsPlugin, ToastPlugin } from "bootstrap-vue";
import ApolloClient from "apollo-boost";
import VueApollo from "vue-apollo";
import VeeValidate from "vee-validate";
import VueRouter from "vue-router";

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(ToastPlugin);
Vue.use(IconsPlugin);
Vue.use(VueApollo);
Vue.config.productionTip = false;

Vue.use(VeeValidate, {
  // This is the default
  inject: true,
  // Important to name this something other than 'fields'
  fieldsBagName: "veeFields",
  // This is not required but avoids possible naming conflicts
  errorBagName: "veeErrors",
});

const apolloClient = new ApolloClient({
  // You should use an absolute URL here
  uri: "https://excited-parakeet-22.hasura.app/v1/graphql",
  headers: {
    "x-hasura-admin-secret":
      "CI2521VPkCEFo2k7ibZFrOHAAEpemLeKvAquqHuoj8lvRRzRVPkxcRj2kW61UoO0",
  },
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

const routes = [
  {
    path: "/create-order",
    name: "create-order",
    component: () => import("@/OrderForm.vue"),
  },
  {
    path: "/dash-board",
    name: "dash-board",
    component: () => import("@/DashBoard.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes,
});

new Vue({
  router,
  apolloProvider,
  render: (h) => h(App),
}).$mount("#app");
