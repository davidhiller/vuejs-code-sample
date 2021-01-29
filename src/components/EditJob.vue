<template>
  <div class="EditJob">
    <h1>{{ msg }}</h1>
    <input type="text" value="jobTitle" placeholder="Job Title" />
    <input type="text" value="jobDescription" placeholder="Description" />
    <ul>
      <li>Job Skill 1</li>
      <li>Job Skill 2</li>
    </ul>
    <button>Save Job</button>
  </div>
</template>

<script>
export default {
  name: "EditJob",
  props: {
    msg: String
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
