<template>
  <div class="JobsIndex">
    <h1>Jobs Index</h1>
    <div class="job-filter">
      <h2>Job Filter</h2>
      <input
        id="skill"
        type="text"
        value=""
        placeholder="Type in one skill to filter jobs by."
        v-model="skill"
      />
    </div>
    <div class="job-list">
      <h2>Job List</h2>
      <ul id="jobs">
        <li v-for="job in filteredJobs" :key="job.id">
          <ShowJob :job="job"></ShowJob>
        </li>
      </ul>
      <h2>-- End of List --</h2>
    </div>
  </div>
</template>

<script>
import ShowJob from "./ShowJob.vue";

export default {
  name: "JobsIndex",
  props: {},
  components: {
    ShowJob
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
