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
        <tr class="explore__tr" v-for="idea in ideas" v-bind:key="idea.title">
          <td class="explore__td">
            <a class="explore__link" v-on:click="checkForAgreement(idea)">{{idea.title}}</a>
          </td>
          <td class="explore__td">{{idea.type}}</td> 
          <td class="explore__td">{{idea.status}}</td>
          <td class="explore__td">{{new Date(idea.status_dt).toLocaleDateString()}}</td>
        </tr>
      </table>
      <ModalDialog v-if="showModal" @cancel="showModal = false" @accept="acceptAgreement">
        <h3 slot="header">Accept Idea Agreement</h3>
        <div slot="body">
          <label class="explore__label">Type</label>
          <div>{{this.selectedIdea.type}}</div>
          <label class="explore__label">Agreement</label>
          <div>{{this.selectedIdea.agreement.agreement}}</div>
        </div>
        <h5 slot="footer">Click to accept this agreement</h5>
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
      currentUserNickname: '',
      showModal: false,
      selectedIdea: null,
      // Search term form variables
      ideaTags: [],
      selectedTag: null,
      searchForTags: [],
      newKeywords: '',
      searchForKeywords: [],
      // Results display variables
      ideas: [],
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
        this.currentUserNickname = profile.nickname;
      })
      .catch((err) => {
        throw new Error(`Error accessing user security profile: ${err}`);
      });
    }
  },
  methods: {
    acceptAgreement() {
      http.put(`/idea/addreviewer/?creator=${this.selectedIdea.creator}&title=${this.selectedIdea.title}&type=${this.selectedIdea.type}&reviewer=${this.currentUserNickname}`)
      .then((response) => {
        if (response.ok && response.nModified) {
          this.showModal = false;
          this.transferToDetails(this.selectedIdea);
        }
        throw new Error(`Error adding reviewer to idea document. ${response}`);
      }).catch((err) => {
        throw new Error(`Error adding an idea reviewer: ${err}`);
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
          currentKeyword === newVal.trim(),
        );
        if (searchResult === undefined) {
          this.searchForKeywords.push(newVal.trim());
        }
        this.newKeywords = '';
      }
    },
    /**
     * @description Examing the selected idea to determine if agreement acceptance is
     * required before transferring to the Idea Details page. The following must be
     * true to transfer without acceptance of the ideas agreement.
     * - The idea must be public
     * - The idea creator and the current user must be one in the same
     * - The current user must have previously accepted the agreement
     * @param {Object} idea The idea selected by the user from the displayed list
     */
    checkForAgreement(idea) {
      if (idea.type === 'public') {
        this.transferToDetails(idea);
        return;
      }
      if (idea.creator === this.currentUserNickname) {
        this.transferToDetails(idea);
        return;
      }
      // eslint-disable-next-line arrow-body-style
      const reviewerNickname = idea.reviews.find((review) => {
        return review.reviewer === this.currentUserNickname;
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
    searchIdeas() {
      http.get(`/ideas/search/?currUser=${this.currentUserNickname}&searchForTags=${this.searchForTags}&searchForKeywords=${this.searchForKeywords}`)
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
      localstorage.setObject('explore-ideas-save', this.$data);
      this.$router.push(`ideas/${idea.creator}/${idea.title}/${idea.type}`);
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

  &__table
    margin 0 auto
    width 100%

  &__th
    padding 10px
    text-transform uppercase
    border-bottom 1px dotted $purple
    &:first-child
      text-align left
      padding-left 0
    &:last-child
      text-align right
      padding-right 0

  &__tr
    padding 10px

  &__td
    padding 10px
    border-bottom 1px dotted $purple
    &:first-child
      padding-left 0
    &:nth-child(2),
    &:nth-child(3)
      text-align center
    &:last-child
      text-align right
      max-width 25px
      padding-right 0

  &__link
    text-decoration none
    color $purple
    border-bottom 1px dotted $purple
    &:hover, &:focus, &:active
      color $aqua
      border-bottom 1px dotted $aqua
      transition color 300ms linear

  &__header
    text-align center
    color $purple
    font-size 1.5em
    line-height 1.2em
    @media (min-width: 600px)
      font-size 36px
      margin-bottom 60px

    & h1
      font-weight 200 !important

  &__label
    text-transform uppercase
    font-size .8em
    letter-spacing 2.5px
    font-weight 700
    display block

  &__input-wrap
    width 100%
    display flex
    margin-bottom 10px

  &__add-button
    width 40px
    margin-left 10px
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    text-align: center;
    font-family: inherit;
    font-weight: inherit;
    font-size: inherit;
    padding 6px 12px
    border 1px solid $purple
    letter-spacing 1.5px
    color $purple
    position: relative;
    overflow: hidden;
    transition all 300ms ease-in-out

    &:hover, &:active, &:focus
      -webkit-appearance: none;
      appearance: none;
      color: inherit;
      background $purple
      background linear-gradient(-134deg, $dkblue 0%, $pink 100%)
      color white
      border 1px solid $purple
      transition all 300ms ease-in-out
      -webkit-box-shadow: 2px 2px 10px 0 rgba(110, 28, 233, 0.8);
      -moz-box-shadow: 2px 2px 10px 0 rgba(110, 28, 233, 0.8);
      box-shadow: 2px 2px 10px 0 rgba(110, 28, 233, 0.8);


  &__input
    padding 10px
    width 100%
    font-size 1em
    border 1px solid $purple
    color $gray_text

    &:focus
      -webkit-box-shadow: 0 0 2px 0 rgba(110, 28, 233, 0.8);
      -moz-box-shadow: 0 0 2px 0 rgba(110, 28, 233, 0.8);
      box-shadow: 0 0 2px 0 rgba(110, 28, 233, 0.8);

  &__textarea
    width 100%
    padding 10px
    font-size 1em
    font-family: 'Titillium Web', Helvetica, Arial, sans-serif
    color: $gray_text
    letter-spacing: 1px
    line-height: 1.5em
    border 1px solid $purple
    margin-bottom 10px

    &:focus
      -webkit-box-shadow: 0 0 2px 0 rgba(110, 28, 233, 0.8);
      -moz-box-shadow: 0 0 2px 0 rgba(110, 28, 233, 0.8);
      box-shadow: 0 0 2px 0 rgba(110, 28, 233, 0.8);

  &__type
    display inline-block
    width 33%

  &__select
    -webkit-appearance none
    -webkit-user-select none
    appearance none
    width 100%
    padding 10px
    font-size 1em
    font-family 'Titillium Web', Helvetica, Arial, sans-serif
    letter-spacing 1px
    color $gray_text
    border 1px solid $purple
    border-radius 0
    background white url('https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_keyboard_arrow_down_48px-128.png') no-repeat
    background-position right 10px center
    background-repeat no-repeat
    background-size 20px



  &__select-option

  &__keyword
    margin 10px 0

  &__button-wrap
    display flex
    justify-content center
    margin 20px auto 0 auto

  &__button

    &--btm
      margin-top 1vh
      text-decoration none

      &:last-child
        margin-left 20px

  &__form-tags


  &__tag-wrap
    margin-bottom 20px


  &__tag,
  &__keyword
    color: $gray_text;
    display: inline-block;
    font-size: 0.9em;
    line-height: 1.4;
    background-color: transparent;
    border-radius: 2px;
    border: 1px solid rgba(124,72,194, 0.25);
    margin-right: 10px;
    margin-top: 5px;
    vertical-align: top;

    &:hover
      border: 1px solid rgba(124,72,194, 1);


    &__label
      border-bottom-right-radius: 2px;
      border-top-right-radius: 2px;
      cursor: default;
      padding: 1px 5px 4px 5px;
      display: inline-block;
      vertical-align: middle;

    &__button
      -webkit-appearance: none;
      appearance: none;
      border: none;
      background: transparent;
      color: inherit;

    &__icon
      display: inline-block;
      cursor: pointer;
      border-bottom-left-radius: 2px;
      border-top-left-radius: 2px;
      border-right: 1px solid rgba(124,72,194, 0.25);
      padding: 1px 5px 3px;

      &:hover
        // color: red;

  &__remove-keyword
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    color: inherit;
    cursor: pointer;
    font-size: 1em;
    border: 1px solid rgba(0, 126, 255, 0.24);
    padding: 0 4px 2px;
    margin-left 10px

    &:hover
      border: 1px solid $gray_bkgrd;

</style>

