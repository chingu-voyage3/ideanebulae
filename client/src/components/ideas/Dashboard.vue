<template>
  <div class="container dashboard">
    <header class="dashboard__header">
      <h1 class="dashboard__title">Dashboard</h1>
    </header>
    <section class="dashboard__idealist" >
      <ul class="dashboard__idealist-wrapper">
        <li class="dashboard__idealist-item" v-bind:key="index" v-for="(idea, index) in ideas">
          <div class="dashboard__idealist-title">{{ idea.title }}</div>
          <div class="dashboard__idealist-reviewcount">{{ idea.reviews.length }}</div>
          <div class="dashboard__idealist-quicklook"><img src="../../assets/eye-sym.svg"></div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import http from '../../api/index';

export default {
  name: 'Dashboard',
  data() {
    return {
      ideas: [],
    };
  },
  mounted() {
    http.get('/ideas')
    .then((response) => {
      if (response.statusText !== 'OK') {
        throw new Error(`Error fetching ideas. ${response}`);
      }
      console.log(response);
    }).catch((err) => {
      throw new Error(`Error fetching ideas: ${err}`);
    });
  },
};
</script>

<style lang="stylus" scoped>

</style>
