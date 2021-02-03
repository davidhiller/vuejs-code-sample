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
          <li class="skill" v-for="(skill, index) in skills" :key="index">
            <input
              type="text"
              id="skill"
              v-model="skills[index]"
              placeholder="Edit this skill."
            />
          </li>
          <li class = "skill">
            <input
              type="text"
              id="skill"
              v-model="newSkill"
              placeholder="Enter new skill."
            >
            <button type="button" @click="this.skills.push(this.newSkill)">Add Skill</button>
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
      id: this.job.id || -1,
      title: this.job.title || "",
      description: this.job.description || "",
      newSkill: " ",
      skills: JSON.parse(JSON.stringify(this.job.skills)) || [] // Create deep copy of job.skills
    };
  },
  methods: {
    clearForm: function() {
      this.id = -1;
      this.title = "";
      this.description = "";
      this.skills = [];
    },
    validateForm: function() {
      return (
        this.title.trim().length > 0 &&
        this.description.trim().length > 0 &&
        this.filterOutEmptySkills().length > 0
      );
    },
    filterOutEmptySkills: function() {
      // Filter out skill items that that have no content
      return this.skills.filter(skill => skill.trim().length != 0);
    },
    saveJob: function() {
      console.log(this.validateForm());
      if (this.validateForm()) {
        let newJob = {
          id: this.id,
          title: this.title,
          description: this.description,
          skills: this.filterOutEmptySkills()
        };
        if (newJob.id === -1) {
          console.log("job-saved: " + newJob.id);
          this.$emit("job-saved", newJob);
          this.clearForm();
        } else {
          console.log("job-updated: " + newJob.id);
          this.$emit("job-updated", newJob);
        }
      } else {
        console.log(
          "title, description, and at least one skill must be entered"
        );
      }
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
