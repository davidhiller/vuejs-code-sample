<template>
  <div class="ShowJob">
    <template v-if="!this.inEditMode">
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
      <button type="button" @click="editJob()" key="edit-job">Edit Job</button>
    </template>
    <template v-else>
      <EditJob :job="job" @job-saved="updateJob(job)" />
    </template>
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
  data() {
    return {
      inEditMode: false
    };
  },
  methods: {
    editJob: function() {
      this.inEditMode = true; // Toggle to edit job
    },
    updateJob(newJob) {
      this.inEditMode = false; // Toggle back to show job
      this.$emit("job-updated", newJob);

      /*******************************************
      // Locate the original of the job that was edited
      const index = this.jobs.findIndex(job => job.id === newJob.id);
      // Replace original job with edited version
      this.jobs[index] = newJob;
      *******************************************/
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
