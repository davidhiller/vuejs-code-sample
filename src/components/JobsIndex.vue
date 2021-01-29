<template>
  <div class="JobsIndex">
    <h1>{{ msg }}</h1>
    <ul id="jobs">
      <li class="job" v-for="job in jobs" :key="job.name">
        {{ job.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "JobsIndex",
  props: {
    msg: String,
    jobs: Array
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
