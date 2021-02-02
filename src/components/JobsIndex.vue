<template>
  <div class="JobsIndex">
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
  props: {},
  data() { // Sample data hard-coded for development.
    return {
      jobs: [
        { id: 1,
          title: "Job A",
          description: "Description for Job A",
          skills: [
            "Skill A1",
            "Skill A2",
            "Skill A3",
            "Skill A4"
          ]
        },
        { id: 2, 
          title: "Job B",
          description: "Description for Job B",
          skills: [
            "Skill B1",
            "Skill B2",
          ]
        },
        { id: 3, 
          title: "Job C",
          description: "Description for Job C",
          skills: [
            "Skill C1",
            "Skill C2",
            "Skill C3"
          ]
        }
      ]
    }
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
