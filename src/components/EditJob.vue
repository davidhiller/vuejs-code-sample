<template>
  <div class="EditJob">
    <form>
      <div class="form-row vertical">
        <div class="form-field">
          <label for="job-title">Job Title</label>
          <input
            type="text"
            id="job-title"
            v-model.trim="title"
            placeholder="Job Title"
          />
        </div>
      </div>

      <div class="form-field">
        <label for="job-description">Description</label>
        <textarea
          type="text"
          id="job-description"
          v-model.trim="description"
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
              v-model.trim="skills[index]"
              placeholder="Edit this skill."
            />
          </li>
          <li class="skill">
            <input
              type="text"
              id="skill"
              v-model.trim="newSkill"
              placeholder="Enter new skill."
              @keyup.enter="addSkill"
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
      id: this.job.id || -1,
      title: this.job.title || "",
      description: this.job.description || "",
      skills: JSON.parse(JSON.stringify(this.job.skills)) || [], // Create deep copy of job.skills
      newSkill: ""
    };
  },
  methods: {
    clearForm: function() {
      this.id = -1;
      this.title = "";
      this.description = "";
      this.skills = [];
      this.newSkill = "";
    },
    addSkill: function() {
      this.skills.push(this.newSkill);
      this.newSkill = "";
    },
    // Filter out skill items that that have no content
    filterOutEmptySkills: function() {
      return this.skills.filter(skill => skill.trim().length != 0);
    },
    saveJob: function() {
      let newJob = {
        id: this.id,
        title: this.title,
        description: this.description,
        skills: this.filterOutEmptySkills()
      };
      this.$emit("job-saved", newJob);
      this.clearForm();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
@import '../styles/colors.sass'

.EditJob
  margin: 10px
  border: 4px solid $edit-job-border-color
  border-radius: 20px
  padding: 10px
  background-color: $edit-job-background

h3
  margin: 0.25em 0 0

ul
  list-style-type: none
  padding: 0

li
  margin: 0 0

input
  width: 100%
  height: 2em
  padding: 12px 20px
  margin: 2px 0
  box-sizing: border-box

  outline: 0

  -webkit-border-radius: 0.25em
  -moz-border-radius: 0.25em
  border-radius: 0.25em

  border: 2px solid edit-job-input-border-color
  color: $edit-job-input-text
  background-color: $edit-job-input-background
</style>
