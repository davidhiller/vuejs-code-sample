<template>
  <div class="JobsIndex">
    <h1>Jobs Index</h1>
    <!-- Add Job -->
    <div class="add-job">
      <h2>Add a new job here:</h2>
      <EditJob :job="blankJob" @job-saved="createJob($event)" />
      <hr />
    </div>
    <!-- Job Filter -->
    <div class="job-filter">
      <h2>...or filter existing jobs by skill:</h2>
      <input
        id="skillFilter"
        type="text"
        value=""
        placeholder="Type in one skill to filter jobs by."
        v-model.trim="query"
      />
      <p class="warning">{{ filterMessage }}</p>
    </div>
    <!-- List and Edit Existing Jobs -->
    <div class="job-list">
      <hr />
      <ul id="jobs">
        <li v-for="job in filteredJobs" :key="job.id">
          <ShowJob
            :job="job"
            @job-deleted="deleteJob(job)"
            @job-updated="updateJob($event)"
          />
        </li>
      </ul>
      <hr />
    </div>
  </div>
</template>

<script>
import ShowJob from "./ShowJob.vue";
import EditJob from "./EditJob.vue";
import store from "../JobsApiHelper.js";

export default {
  name: "JobsIndex",
  props: {},
  components: {
    ShowJob,
    EditJob
  },
  // Sample data hard-coded for development.
  data() {
    return {
      jobs: store.jobs,
      query: "",
      blankJob: {
        id: -1,
        title: "",
        description: "",
        skills: []
      }
    };
  },
  computed: {
    filteredJobs: function() {
      let skillFilter = this.query.toLowerCase();
      let jobs = this.jobs;
      if (skillFilter) {
        jobs = jobs.filter(job =>
          job.skills.some(skill =>
            skill
              .trim()
              .toLowerCase()
              .includes(skillFilter)
          )
        );
      }
      return jobs;
    },
    filterMessage: function() {
      let skillFilter = this.query.toLowerCase();
      if (skillFilter) {
        return `Filtering on skills; showing ${this.filteredJobs.length} of ${this.jobs.length} Jobs.`;
      } else {
        return "";
      }
    }
  },
  methods: {
    deleteJob(deletedJob) {
      this.jobs = this.jobs.filter(job => job !== deletedJob);
    },
    createJob(newJob) {
      // Create a new unique id and assign it to the new job
      newJob.id = Date.now();

      // Add newJob to jobs
      this.jobs.push(newJob);
    },
    updateJob(jobWithEdits) {
      // Locate the original of the job that was edited
      const index = this.jobs.findIndex(job => job.id === jobWithEdits.id);

      // Replace original job with edited version
      this.jobs.splice(index, 1, jobWithEdits);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
@import '../styles/colors.sass'

h3
  margin: 40px 0 0

ul
  list-style-type: none
  padding: 0

li
  display: inline
  margin: 0 10px

.warning
  color: $warning
  font-size: 1em
  // color: #e50038

#skillFilter
  float: center
  text-align: center
  font-size: 1.5em
  padding: 0.125em 0.125em
</style>
