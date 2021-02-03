<template>
  <div class="JobsIndex">
    <h1>Jobs Index</h1>
    <!-- Add Job -->
    <!-- Job Filter -->
    <div class="job-filter">
      <h2>...or filter existing jobs by skill:</h2>
      <input
        id="skillFilter"
        type="text"
        value=""
        placeholder="Type in one skill to filter jobs by."
        v-model="skill"
      />
      <p class="warning">{{ filterMessage }}</p>
    </div>
    <!-- List and Edit Existing Jobs -->
    <div class="job-list">
      <hr />
      <ul id="jobs">
        <li v-for="job in filteredJobs" :key="job.id">
          <ShowJob :job="job" @job-deleted="deleteJob(job)" />
          <EditJob :job="job" @job-saved="updateJob($event)" />
        </li>
      </ul>
      <hr />
    </div>
  </div>
</template>

<script>
import ShowJob from "./ShowJob.vue";
import EditJob from "./EditJob.vue";

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
      skill: "",
      jobs: [
        {
          id: 1,
          title: "Job A",
          description: "Description for Job A",
          skills: ["Skill Address A1", "Skill A2", "Skill A3", "Skill A4"]
        },
        {
          id: 2,
          title: "Job B",
          description: "Description for Job B",
          skills: ["Skill Xylophone B1", "Skill B2"]
        },
        {
          id: 3,
          title: "Job C",
          description: "Description for Job C",
          skills: ["Skill Catapult C1", "Skill C2", "Skill C3"]
        },
        {
          id: 4,
          title: "Job D",
          description: "Description for Job D",
          skills: [
            "Skill D1",
            "Skill D2",
            "Skill D3",
            "Skill Antelope D4",
            "Skill D5"
          ]
        },
        {
          id: 5,
          title: "Job E",
          description: "Description for Job E",
          skills: ["Skill Dress E1"]
        },
        {
          id: 6,
          title: "Job F",
          description: "Description for Job F",
          skills: ["Skill F1", "Skill F2"]
        }
      ]
    };
  },
  computed: {
    filteredJobs: function() {
      let skillFilter = this.skill.trim().toLowerCase();
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
      let skillFilter = this.skill.trim().toLowerCase();
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
    updateJob(newJob) {
      console.log("updateJob called");
      // Locate the original of the job that was edited
      const index = this.jobs.findIndex(job => job.id === newJob.id);
      console.log("index: " + index);
      console.log("new Job: ");
      console.log(newJob);
      // Replace original job with edited version
      this.jobs[index] = newJob;
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
.warning {
  color: #e50038;
  font-size: 1em;
}
#skillFilter {
  float: center;
  text-align: center;
  font-size: 1.5em;
  padding: 0.125em 0.125em;
}
</style>
