<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <JobsIndex msg="--JobsIndex component--" />
    <ShowJob msg="--ShowJob component--"/>
    <EditJob msg="--EditJob component--" />
  </div>
</template>

<script>
import JobsIndex from "./components/JobsIndex.vue";
import ShowJob from "./components/JobsIndex.vue";
import EditJob from "./components/EditJob.vue";

export default {
  name: "App",
  components: {
    JobsIndex,
    ShowJob,
    EditJob
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
