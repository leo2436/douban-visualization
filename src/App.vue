<template>
  <div id="app">
    <round-stat />
    <country-stat />
  </div>
</template>

<script>
import roundStat from "./components/BarStat.vue";
import countryStat from "./components/CountryStat.vue";
export default {
  name: "App",
  components: {
    roundStat,
    countryStat
  },
  created() {
    this.$store.commit("_getData");
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
