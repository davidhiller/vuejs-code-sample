<template>
  <div class="ShowJob">
    <hr />
    <h3>Title: {{ job.title }}</h3>
    <span id="description">
      <h3>Description: </h3>
      <p> {{ job.description }} </p>
    </span>
    <div id="skill-list">
      <h3> Skills: </h3>
      <ul id="skills">
        <li class="skill" v-for="(skill, index) in job.skills" :key="index">
          {{ skill }}
        </li>
      </ul>
    </div>
    <hr />
  </div>
</template>

<script>
export default {
  name: "ShowJob",
  props: {
    job: Object
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 0.25em 0 0;
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
