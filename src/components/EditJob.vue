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

      <!-- List of text fields, one for each skill + a blank one for new entry. -->
      <div class="form-field">
        <ul id="edit-skills">
          <li class="skill" v-for="(skill, index) in editSkills" :key="index">
            <input
              type="text"
              id="skill"
              v-model="skills[index]"
              placeholder="Enter new skill."
              @blur="editSkills"
            />
          </li>
        </ul>
      </div>

      <button type="button" @click="saveJob">Save</button>
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
      id: this.job.id,
      title: this.job.title,
      description: this.job.description,
      skills: this.job.skills.slice() // Create deep copy of job.skills
    };
  },
  computed: {
    editSkills: function() {
      let skills = this.skills;
      // Gurantee that the last item in the skills array is always an empty string.
      if (!skills[skills.length - 1].trim() === "") {
        return skills.concat("");
      } else {
        return skills;
      }
    },
    filterEmptySkills: function() {
      return this.skills.filter(skill => skill.trim().length != 0);
    },
    newJob: function() {
      return {
        id: this.job.id,
        title: this.title,
        description: this.description,
        skills: this.filterEmptySkills
      };
    }
  },
  methods: {
    saveJob: function() {
      console.log("job-saved: "+this.newJob.id);
      this.$emit("job-saved", this.newJob);
    }
  }
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
