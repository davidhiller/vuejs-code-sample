<template>
  <div class="ShowJob">
    <!--<button @click="editJob">Edit Job</button>-->
    <button type="button" @click="$emit('job-deleted')">Delete Job</button>
    <h3>Title: {{ job.title }}</h3>
    <span id="description">
      <h3>Description:</h3>
      <p>{{ job.description }}</p>
    </span>
    <div id="skill-list">
      <h3>Skills:</h3>
      <ul id="skills">
        <li class="skill" v-for="(skill, index) in job.skills" :key="index">
          {{ skill }}
        </li>
      </ul>
    </div>
    <EditJob :job="job" @job-updated="updateJob($event)" />
  </div>
</template>

<script>
import EditJob from "./EditJob.vue";

export default {
  name: "ShowJob",
  props: {
    job: Object
  },
  components: {
    EditJob
  },
  methods: {
    editJob: function() {
      console.log("Switching to edit mode.");
      //this.$emit("Job Submitted");
      //this.tempMessage = "";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
@import '../styles/colors.sass'

.ShowJob
  margin: 10px
  border: 4px solid $show-job-border-color
  border-radius: 20px
  padding: 10px
  color: $show-job-text
  background-color: $show-job-background

h3
  margin: 0.25em 0 0

ul
  list-style-type: none
  padding: 0

li
  display: inline-block
  margin: 0 10px

input
  width: 100%
  height: 2em
  padding: 12px 20px
  margin: 8px 0
  box-sizing: border-box

  outline: 0

  -webkit-border-radius: 0.25em
  -moz-border-radius: 0.25em
  border-radius: 0.25em

  border: 2px solid $show-job-input-border-color
  color: $show-job-input-text
  background-color: $show-job-input-background
</style>
