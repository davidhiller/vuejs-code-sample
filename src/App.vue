<!-- Copyright (c) 2021 David Hiller -->
<template>
  <div id="app">
    <JobsIndex />
  </div>
</template>

<script>
import JobsIndex from "./components/JobsIndex.vue";

export default {
  name: "App",
  components: {
    JobsIndex
  }
};
</script>

<style lang="sass">
@import './styles/colors.sass'

:root
  background-color: $root-background

#app
  font-family: Roboto, Avenir, Helvetica, Arial, sans-serif
  font-weight: lighter
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  background-color: $app-background
  color: $app-text
  margin-top: 60px

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

  border: 2px solid $app-input-border-color
  color: $app-input-text
  background-color: $app-input-background

textarea
  width: 100%
  height: 5em
  padding: 12px 20px
  margin: 8px 0
  box-sizing: border-box
  resize: none

  outline: 0

  -webkit-border-radius: 0.25em
  -moz-border-radius: 0.25em
  border-radius: 0.25em

  border: 2px solid $app-input-border-color
  color: $app-input-text
  background-color: $app-input-background
</style>
