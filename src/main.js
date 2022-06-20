import Vue from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "bootstrap-vue/dist/bootstrap-vue-icons.min.css";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import ApolloClient from "apollo-boost";
import VueApollo from "vue-apollo";
import VeeValidate from "vee-validate";
Vue.use(BootstrapVue);
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

new Vue({
  apolloProvider,
  render: (h) => h(App),
}).$mount("#app");
