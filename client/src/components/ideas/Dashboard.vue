<template>
  <div class="container dashboard">
    <header class="dashboard__header">
      <h1 class="dashboard__title">Dashboard</h1>
    </header>
    <section class="dashboard__searchbar">
      <input class="dashboard__searchbar-input" v-bind="searchText">
    </section>
    <section class="dashboard__idealist" >
      <ul class="dashboard__idealist-wrapper">
        <li class="dashboard__idealist-item" v-bind:key="index" v-for="(idea, index) in shownIdeas">
          <router-link :to="`/ideas/${idea.creator}/${idea.title}/${idea.type}`">
            <div class="dashboard__idealist-item-left">
              <div class="dashboard__idealist-item-title">{{ idea.title }}</div>
            </div>
            <div class="dashboard__idealist-item-right">
              <div class="dashboard__idealist-item-status">{{ idea.status }}</div>
              <div class="dashboard__idealist-item-reviewcount">{{ idea.reviews.length }}</div>
              <div class="dashboard__idealist-item-quicklook" @mouseover="hoverOver=index" @mouseout="hoverOver=-1">
                <img src="../../assets/eye-sym.svg" height="10" width="10">
              </div>
            </div>
          </router-link>
        </li>
      </ul>
      <div class="dashboard__idealist-hover" v-if="hoverOver!=-1">
        <ul class="dashboard__idealist-hover-list">
          <li class="dashboard__idealist-hover-review" v-bind:key="index" v-for="(review, index) in shownIdeas[hoverOver].reviews">
            <div class="dashboard__idealist-hover-review-text">{{ review.comments | truncate(70) }}</div>
            <div class="dashboard__idealist-hover-review-id">{{ review.reviewer }}</div>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import debounce from 'lodash.debounce';
import http from '../../api/index';
import filters from '../../filters';

export default {
  name: 'Dashboard',
  data() {
    return {
      ideas: [],
      shownIdeas: [],
      hoverOver: -1,
      searchText: '',
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
      this.$data.shownIdeas = response.data;
    }).catch((err) => {
      throw new Error(`Error fetching ideas: ${err}`);
    });
  },
  watch: {
    searchText: debounce((newVal) => {
      const searchValue = newVal.trim();
      const searchTags = searchValue.split(' ');

      // Find the ideas and calculate relevance
      this.ideas.forEach((idea) => {
        searchTags.forEach((tag, index) => {
          if (idea.title.contains(tag) || idea.description.contains(tag)) {
            if (index === this.shownIdeas.length) {
              this.shownIdeas[index] = {
                idea,
                relevance: 1,
              };
            } else {
              this.shownIdeas[index].relevance += 1;
            }
          }
        });
      });

      // Sort by relevance
      this.shownIdeas.sort((a, b) => a.relevance - b.relevance);
    }, 500, { trailing: true }),
  },
};
</script>

<style lang="stylus" scoped>

</style>
