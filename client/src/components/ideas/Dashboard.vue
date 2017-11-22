<template>
  <div class="container dashboard">
    <header class="dashboard__header">
      <h1 class="dashboard__title">Dashboard</h1>
    </header>
    <section class="dashboard__form-wrapper">
      <div class="dashboard__form-element">

        <!-- Capture tags to search for -->
        <div class="dashboard__form-tags">
          <div class="dashboard__tag-wrap">
            <span class="dashboard__form-tag" v-for="(tag, index) in searchForTags" v-bind:key="index">
              <span class="dashboard__tag" >
                <span class="dashboard__tag__icon" aria-hidden="true">
                  <button
                    class="dashboard__tag__button"
                    @click="removeTag(index)">
                      &times;
                  </button>
                </span>
                <span class="dashboard__tag__label" role="option" aria-selected="true">
                    {{tag}}
                  <span class="tag-aria-only">&nbsp;</span>
                </span>
              </span>
            </span>
          </div>

          <label class="dashboard__label" for="dashboard__tags">Tags</label>
          <select class="dashboard__select" v-model="selectedTag" v-on:change="tagIsSelected">
            <option class="dashboard__select-option" :value="null" disabled>
              Choose Tag
            </option>
            <option class="dashboard__select-option" v-for="tag in ideaTags" v-bind:key="tag" v-bind:value="tag">
              {{ tag }}
            </option>
          </select>
        </div>

        <!-- Capture keywords to search for -->
        <div class="dashboard__form-keywords">
          <div class="dashboard__keyword-wrap">
            <span class="dashboard__form-keyword" v-for="(keyword, index) in searchForKeywords" v-bind:key="index">
              <span class="dashboard__keyword" >
                <span class="dashboard__keyword__icon" aria-hidden="true">
                  <button
                    class="dashboard__keyword__button"
                    @click="removeKeyword(index)">
                      &times;
                  </button>
                </span>
                <span class="dashboard__keyword__label" role="option" aria-selected="true">
                    {{keyword}}
                  <span class="keyword-aria-only">&nbsp;</span>
                </span>
              </span>
            </span>
          </div>

          <label class="dashboard__label" for="dashboard__keywords">Keywords</label>
          <div class="dashboard__input-wrap">
            <input class="dashboard__input" name="newKeywords" type="text" v-model="newKeywords" @keyup.enter="addKeyword" @keyup.188="addKeyword" @keyup.tab="addKeyword" placeholder="Add keyword to your search">
            <button class="dashboard__add-button"
              @click="addKeyword"> + </button>
          </div>
        </div>
      </div>

      <!-- Process search form buttons -->
      <div class="dashboard__button-wrap">
        <a class="btn btn__primary profile__button dashboard__button--btm" @click="clearSearchTerms">Clear</a>
        <button class="btn btn__primary profile__button dashboard__button--btm" @click="searchIdeas">Search</button>
      </div>
    </section>

    <section class="dashboard__idealist" >
      <ul class="dashboard__idealist-wrapper">
        <li class="dashboard__idealist-item" v-bind:key="index" v-for="(idea, index) in ideas">
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
import { getUserProfile, getAccessToken } from '@/auth';
import localstorage from '@/utils/localstorage';
import http from '../../api/index';
import filters from '../../filters';

export default {
  name: 'Dashboard',
  data() {
    return {
      // Environment information
      currentUser: '',
      showModal: false,

      // Search term form variables
      ideaTags: [],
      selectedTag: null,
      searchForTags: [],
      newKeywords: '',
      searchForKeywords: [],

      // Results display variables
      ideas: [],
      selectedIdea: null,
      hoverOver: -1,
    };
  },
  filters,
  mounted() {
    const savedState = localstorage.getObject('dashboard-ideas-save');

    http.get('/ideas')
    .then((response) => {
      if (response.statusText !== 'OK') {
        throw new Error(`Error fetching ideas. ${response}`);
      }
      this.$data.ideas = response.data;
    }).catch((err) => {
      throw new Error(`Error fetching ideas: ${err}`);
    });

    if (savedState != null) {
      Object.assign(this.$data, savedState);
    }
    // Retrieve all unique tags referenced across all ideas
    http.get('/ideas/getalltags').then((response) => {
      this.ideaTags = response.data;
    }).catch((err) => {
      throw new Error(`Error retrieving all idea tags: ${err}`);
    });
    // Retrieve attributes of the currently logged on user
    if (getAccessToken()) {
      getUserProfile()
      .then((profile) => {
        this.currentUser = profile.sub;
      })
      .catch((err) => {
        throw new Error(`Error accessing user security profile: ${err}`);
      });
    }
  },
  methods: {
    addKeyword() {
      let newVal = this.newKeywords.trim();
      if (newVal[newVal.length - 1] === ',') {
        newVal = newVal.slice(0, -1);
      }
      if (newVal.length !== 0) {
        // Add the new keyword to the array only if it hasn't been previously added
        const searchResult = this.searchForKeywords.find(currentKeyword =>
          currentKeyword === newVal.trim(),
        );
        if (searchResult === undefined) {
          this.searchForKeywords.push(newVal.trim());
        }
        this.newKeywords = '';
      }
    },
    clearSearchTerms() {
      this.selectedTag = '';
      this.searchForTags = [];
      this.newKeywords = '';
      this.searchForKeywords = [];
      this.ideas = [];
      localStorage.removeItem('explore-ideas-save');
    },
    removeKeyword(index) {
      this.searchForKeywords.splice(index, 1);
    },
    removeTag(index) {
      this.searchForTags.splice(index, 1);
    },
    searchIdeas() {
      http.get(`/ideas/search/?currUser=${this.currentUser}&searchForTags=${this.searchForTags}&searchForKeywords=${this.searchForKeywords}`)
      .then((response) => {
        this.ideas = response.data;
      }).catch((err) => {
        throw new Error(`Error searching ideas on tags/keywords: ${err}`);
      });
    },
    tagIsSelected() {
      const newVal = this.selectedTag.trim();
      // Add the new tag to the array only if it hasn't been previously added
      const searchResult = this.searchForTags.find(currentTag =>
        currentTag === newVal.trim(),
      );
      if (searchResult === undefined) {
        this.searchForTags.push(newVal.trim());
      }
      this.selectedTag = null;
    },
    transferToDetails(idea) {
      localstorage.setObject('dashboard-ideas-save', this.$data);
      this.$router.push(`ideas/${idea.creator}/${idea.title}/${idea.type}`);
    },
    typeToggle(type) {
      this.ideaType = type;
    },
  },
};
</script>

<style lang="stylus" scoped>

</style>
