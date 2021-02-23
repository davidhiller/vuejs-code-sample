<!-- Copyright 2021 David Hiller -->
<template>
  <div class="jobs-index">
    <h1>Jobs Index</h1>
    <!-- Add Job -->
    <div class="section-add-job">
      <h2>Add a new job here:</h2>
      <EditJob ref="add-job" :job="blankJob" @job-saved="createJob($event)" />
      <hr />
    </div>
    <!-- Job Filter -->
    <div class="section-job-filter">
      <h2>...or filter existing jobs by skill:</h2>
      <input
        class="skill-filter"
        type="text"
        value=""
        placeholder="Type in one skill to filter jobs by."
        v-model.trim="query"
      />
      <p class="warning">{{ filterMessage }}</p>
    </div>
    <!-- List and Edit Existing Jobs -->
    <div class="section-job-list">
      <hr />
      <ul class="job-list">
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
import JobsApiWrapper from "../JobsApiHelper.js";

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
      jobsModel: null,
      jobs: null,
      query: "",
      blankJob: {
        id: -1,
        title: "",
        description: "",
        skills: []
      }
    };
  },
  mounted: function() {
    this.jobsModel = new JobsApiWrapper();
    this.getAllJobs();
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
    getAllJobs() {
      this.jobs = this.jobsModel.get();
    },
    deleteJob(deletedJob) {
      const id = deletedJob.id;
      this.jobsModel.delete(id);
      this.getAllJobs();
    },
    createJob(newJob) {
      this.jobsModel.post(newJob);
      this.getAllJobs();
    },
    updateJob(jobWithEdits) {
      this.jobsModel.patch(jobWithEdits);
      this.getAllJobs();
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

.skill-filter
  float: center
  text-align: center
  font-size: 1.5em
  padding: 0.125em 0.125em
</style>
