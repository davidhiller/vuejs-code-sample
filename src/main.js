import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  data: {
  	jobs: [
  	  { name: "Job 1 from data" },
  	  { name: "Job 2 from data" },
  	  { name: "Job 3 from data" },
  	  { name: "Job 4 from data" }
  	]
  },
  render: h => h(App)
}).$mount("#app");
