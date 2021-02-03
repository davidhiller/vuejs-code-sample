<template>
  <div class="EditJob">
    <form>
      <div class="form-row vertical">
        <div class="form-field">
          <label for="job-title">Job Title</label>
          <input
            type="text"
            id="job-title"
            v-model="title"
            placeholder="Job Title"
          />
        </div>
      </div>

      <div class="form-field">
        <label for="job-description">Description</label>
        <textarea
          type="text"
          id="job-description"
          v-model="description"
          placeholder="Description"
        />
      </div>

      <div>
        <ul id="skills">
          <li class="skill" v-for="(skill, index) in skills" :key="index">
            <input
              type="text"
              id="skill"
              v-model="skills[index]"
              placeholder="Enter new skill."
            />
          </li>
        </ul>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "EditJob",
  props: {
    job: Object
  },
  data() {
    return {
      title: this.job.title,
      description: this.job.description,
      jobSkills: this.job.skills
    };
  },
  computed: {
    skills: function() {
      let skills = this.jobSkills;
      return skills.concat("");
    },
    filterEmptySkills: function() {
      this.skill.trim();
      return this.newJob.skills;
    },
    newJob: function() {
      return {
        title: this.title,
        description: this.description,
        skills: this.filterEmptySkills
      };
    }
  } /*,
  methods: {
    submit: function() {
      alert("job-updated");
      //this.$emit("Job Submitted");
      //this.tempMessage = "";
    }
  }*/
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.EditJob {
  margin: 10px;
  border: 4px solid #e75466;
  border-radius: 20px;
  padding: 10px;
  background-color: #e9e9e9;
}
h3 {
  margin: 0.25em 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
