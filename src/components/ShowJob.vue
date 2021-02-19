<template>
  <div class="show-job">
    <template v-if="!this.inEditMode">
      <button
        ref="btn-delete-job"
        class="btn-delete-job"
        type="button"
        @click="$emit('job-deleted')"
      >
        Delete Job
      </button>
      <h3>Title: {{ job.title }}</h3>
      <span class="description">
        <h3>Description:</h3>
        <p>{{ job.description }}</p>
      </span>
      <div>
        <h3>Skills:</h3>
        <ul class="skill-list">
          <li class="skill" v-for="(skill, index) in job.skills" :key="index">
            {{ skill }}
          </li>
        </ul>
      </div>
      <button
        ref="btn-edit-job"
        class="btn-edit-job"
        type="button"
        @click="editJob()"
        key="edit-job"
      >
        Edit Job
      </button>
    </template>
    <template v-else>
      <EditJob :job="job" @job-saved="updateJob($event)" />
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
@import '../styles/colors.sass'

.show-job
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
