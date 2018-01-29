<template>
  <div class="container explore">
    <header class="explore__header">
      <h1 class="explore__title">Explore Ideas</h1>
    </header>

    <section class="explore__form-wrapper">
      <div class="explore__form-element">

        <!-- Capture tags to search for -->
        <div class="explore__form-tags">
          <div class="explore__tag-wrap">
            <span class="explore__form-tag" v-for="(tag, index) in searchForTags" v-bind:key="index">
              <span class="explore__tag" >
                <span class="explore__tag__icon" aria-hidden="true">
                  <button
                    class="explore__tag__button"
                    @click="removeTag(index)">
                      &times;
                  </button>
                </span>
                <span class="explore__tag__label" role="option" aria-selected="true">
                    {{tag}}
                  <span class="tag-aria-only">&nbsp;</span>
                </span>
              </span>
            </span>
          </div>

          <label class="explore__label" for="explore__tags">Tags</label>
          <select class="explore__select" v-model="selectedTag" v-on:change="tagIsSelected">
            <option class="explore__select-option" :value="null" disabled>
              Choose Tag
            </option>
            <option class="explore__select-option" v-for="tag in ideaTags" v-bind:key="tag" v-bind:value="tag">
              {{ tag }}
            </option>
          </select>
        </div>

        <!-- Capture keywords to search for -->
        <div class="explore__form-keywords">
          <div class="explore__keyword-wrap">
            <span class="explore__form-keyword" v-for="(keyword, index) in searchForKeywords" v-bind:key="index">
              <span class="explore__keyword" >
                <span class="explore__keyword__icon" aria-hidden="true">
                  <button
                    class="explore__keyword__button"
                    @click="removeKeyword(index)">
                      &times;
                  </button>
                </span>
                <span class="explore__keyword__label" role="option" aria-selected="true">
                    {{keyword}}
                  <span class="keyword-aria-only">&nbsp;</span>
                </span>
              </span>
            </span>
          </div>

          <label class="explore__label" for="explore__keywords">Keywords</label>
          <div class="explore__input-wrap">
            <input class="explore__input" name="newKeywords" type="text" v-model="newKeywords" @keyup.enter="addKeyword" @keyup.188="addKeyword" @keyup.tab="addKeyword" placeholder="Add keyword to your search">
            <button class="explore__add-button"
              @click="addKeyword"> + </button>
          </div>
        </div>
      </div>

      <!-- Process search form buttons -->
      <div class="explore__button-wrap">
        <a class="btn btn__primary profile__button explore__button--btm" @click="clearSearchTerms">Clear</a>
        <button class="btn btn__primary profile__button explore__button--btm" @click="searchIdeas">Search</button>
      </div>
    </section>

    <!-- Filtered Search Results -->
    <section class="explore__results" v-show="ideas.length">
      <table class="explore__table">
        <tr class="explore__tr">
          <th class="explore__th">Idea</th>
          <th class="explore__th">Type</th>
          <th class="explore__th">Status</th>
          <th class="explore__th">Status Date</th>
        </tr>
        <tr class="explore__tr" v-for="idea in ideas" v-bind:key="idea.idea.title">
          <td class="explore__td">
            <a class="explore__link" v-on:click="checkForAgreement(idea.idea)">{{idea.idea.title}}</a>
          </td>
          <td class="explore__td">{{idea.idea.idea_type}}</td>
          <td class="explore__td">{{idea.idea.status}}</td>
          <td class="explore__td">{{new Date(idea.idea.status_dt).toLocaleDateString()}}</td>
        </tr>
      </table>
      <ModalDialog v-if="showModal" @cancel="showModal = false" @accept="acceptAgreement">
        <h3 slot="header" class="modal-header">Accept Idea Agreement</h3>
        <div slot="body" class="modal-body">
          <label class="explore__label">Type</label>
          <div class="modal-p modal-proper">{{this.selectedIdea.idea_type}}</div>
          <label class="explore__label">Agreement</label>
          <div v-if="selectedIdea.agreement !== undefined">
            <div>{{this.selectedIdea.agreement.agreement}}</div>
          </div>
          <div v-else>
            <div>No agreement has been defined for this idea</div>
          </div>
        </div>
        <div class="modal-footer" slot="footer">Click to accept this agreement</div>
      </ModalDialog>
    </section>

  </div>
</template>

<script>
import { getUserProfile, getAccessToken } from '@/auth';
import localstorage from '@/utils/localstorage';
import http from '../../api/index';
import ModalDialog from '../shared/ModalDialog';

export default {
  name: 'ExploreIdeas',
  components: {
    ModalDialog,
  },
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
    };
  },
  mounted() {
    const savedState = localstorage.getObject('explore-ideas-save');
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
    acceptAgreement() {
      http.post(`/review/?ideaid=${this.selectedIdea.id}&reviewername=${this.currentUser}`,
        {
          comment: '',
        },
      )
      // eslint-disable-next-line no-unused-vars
      .then((response) => {
        this.showModal = false;
        this.transferToDetails(this.selectedIdea);
      })
      .catch((err) => {
        throw new Error('Error adding an idea reviewer: ', err);
      });
    },
    addKeyword() {
      let newVal = this.newKeywords.trim();
      if (newVal[newVal.length - 1] === ',') {
        newVal = newVal.slice(0, -1);
      }
      if (newVal.length !== 0) {
        // Add the new keyword to the array only if it hasn't been previously added
        const searchResult = this.searchForKeywords.find(currentKeyword =>
          currentKeyword === newVal,
        );
        if (searchResult === undefined) {
          this.searchForKeywords.push(newVal);
        }
        this.newKeywords = '';
      }
    },
    /**
     * @description Examing the selected idea to determine if agreement
     * acceptance is required before transferring to the Idea Details page.
     * The following must be true to transfer without acceptance of the ideas
     * agreement.
     * - The idea must be public
     * - The idea creator and the current user must be one in the same
     * - The current user must have previously accepted the agreement
     * @param {Object} idea The idea selected by the user from the displayed list
     */
    checkForAgreement(idea) {
      if (idea.idea_type === 'public') {
        this.transferToDetails(idea);
        return;
      }
      if (idea.creator === this.currentUser) {
        this.transferToDetails(idea);
        return;
      }
      // eslint-disable-next-line arrow-body-style
      const reviewerNickname = idea.reviews.find((review) => {
        return review.reviewer === this.currentUser;
      });
      if (reviewerNickname !== undefined) {
        this.transferToDetails(idea);
        return;
      }
      // Prompt the user for acceptance of the agreement
      this.selectedIdea = idea;
      this.showModal = true;
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
    /**
     * @description Search for ideas matching whose tags match one or more of
     * the tags selected by the user or whose title and description contain
     * one or more of the keywords provided by the user.
     */
    searchIdeas() {
      http.get(`/ideas/search/?currUser=${this.currentUser}&searchForTags=${this.searchForTags}&searchForKeywords=${this.searchForKeywords}`)
      .then((response) => {
        console.log('searchIdeas response.data: \n', response.data);
        this.ideas = response.data;
      }).catch((err) => {
        throw new Error(`Error searching ideas on tags/keywords: ${err}`);
      });
    },
    tagIsSelected() {
      const newVal = this.selectedTag.trim();
      // Add the new tag to the array only if it hasn't been previously added
      const searchResult = this.searchForTags.find(currentTag =>
        currentTag === newVal,
      );
      if (searchResult === undefined) {
        this.searchForTags.push(newVal.trim());
      }
      this.selectedTag = null;
    },
    transferToDetails(idea) {
      localstorage.setObject('explore-ideas-save', this.$data);
      this.$router.push(`ideas/${idea.user_id}/${idea.title}/${idea.idea_type}`);
    },
    typeToggle(type) {
      this.ideaType = type;
    },

  },
};

</script>

<style lang="stylus" scoped>
@import '~stylus_var'

.explore
  @import '../shared/css_components/headings.styl'
  @import '../shared/css_components/table.styl'
  @import '../shared/css_components/link.styl'
  @import '../shared/css_components/textareas.styl'
  @import '../shared/css_components/button.styl'
  @import '../shared/css_components/ideatags.styl'
  @import '../shared/css_components/ideakeywords.styl'

  &__form-wrapper,
  &__results
    width 100%
    max-width 600px
    margin auto
    padding 40px 10px
    @media (min-width: 600px)
      padding 40px
      border 1px solid $purple

  &__results
    margin-top 20px
    padding 40px 0 0 0
    @media (min-width: 600px)
      border 0

</style>

