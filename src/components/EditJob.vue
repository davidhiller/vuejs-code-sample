<template>
  <div class="EditJob">
    <h1>This is the EditJob component</h1>
    <form>
      <div class="form-row vertical">
        <div class="form-field">
          <label for="job-title">Job Title</label>
          <input
            type="text"
            id="job-title"
            value="title"
            placeholder="Job Title"
          />
        </div>
      </div>

      <div class="form-field">
        <label for="job-description">Description</label>
        <input
          type="text"
          id="job-description"
          value="description"
          placeholder="Description"
        />
      </div>

      <div>
        <ul id="skills">
          <li class="skill" v-for="(skill, index) in job.skills" :key="index">
            <input
              type="text"
              id="skill"
              value="skill"
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
      skills: this.job.skills
    };
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
h3 {
  margin: 40px 0 0;
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
