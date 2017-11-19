<template>
  <div class="container dashboard">
    <header class="dashboard__header">
      <h1 class="dashboard__title">Dashboard</h1>
    </header>
    <section class="dashboard__idealist" >
      <ul class="dashboard__idealist-wrapper">
        <li class="dashboard__idealist-item" v-bind:key="index" v-for="(idea, index) in ideas">
          <div class="dashboard__idealist-left">
            <div class="dashboard__idealist-title">{{ idea.title }}</div>
          </div>
          <div class="dashboard__idealist-right">
            <div class="dashboard__idealist-reviewcount">{{ idea.reviews.length }}</div>
            <div class="dashboard__idealist-quicklook" @mouseover="hoverOver=index" @mouseout="hoverOver=-1"><img src="../../assets/eye-sym.svg" height="10" width="10"></div>
          </div>
        </li>
      </ul>
      <div class="dashboard__idealist-hover" v-if="hoverOver!=-1">
        <ul class="dashboard__idealist-hover-list">
          <li class="dashboard__idealist-hover-review" v-bind:key="index" v-for="(review, index) in ideas[hoverOver].reviews">
            <div class="dashboard__idealist-hover-review-text">{{ review.comments | truncate(70) }}</div>
            <div class="dashboard__idealist-hover-review-id">{{ review.reviewer }}</div>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import http from '../../api/index';
import filters from '../../filters';

export default {
  name: 'Dashboard',
  data() {
    return {
      ideas: [],
      hoverOver: -1,
    };
  },
  filters,
  mounted() {
    http.get('/ideas')
    .then((response) => {
      if (response.statusText !== 'OK') {
        throw new Error(`Error fetching ideas. ${response}`);
      }
      this.$data.ideas = response.data;
    }).catch((err) => {
      throw new Error(`Error fetching ideas: ${err}`);
    });
  },
};
</script>

<style lang="stylus" scoped>

</style>
