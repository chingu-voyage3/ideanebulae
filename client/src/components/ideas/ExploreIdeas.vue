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
    <section class="explore">
      <div class="container explore">
        <table>
          <tr>
            <th>Idea</th>
            <th>Type</th>
            <th>Status</th>
            <th>Status Date</th
          </tr>
          <tr v-for="idea in ideas" v-bind:key="idea.title">
            <td>{{idea.title}}</td>
            <td>{{idea.type}}</td>
            <td>{{idea.status}}</td>
            <td>{{idea.status_dt}}</td>
          </tr>
        </table>
      </div>
    </section>

  </div>
</template>

<script>
import http from '../../api/index';

export default {
  name: 'ExploreIdeas',
  data() {
    return {
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
    },
    removeKeyword(index) {
      this.searchForKeywords.splice(index, 1);
    },
    removeTag(index) {
      this.searchForTags.splice(index, 1);
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
    typeToggle(type) {
      this.ideaType = type;
    },
    searchIdeas() {
      http.get(`/ideas/search/?searchForTags=${this.searchForTags}&searchForKeywords=${this.searchForKeywords}`)
      .then((response) => {
        this.ideas = response.data;
      }).catch((err) => {
        // eslint-disable-next-line
        console.error(err);
      });
    },
  },
  mounted() {
    // Retrieve all unique tags referenced across all ideas
    http.get('/ideas/getAllTags').then((response) => {
      this.ideaTags = response.data;
    }).catch((err) => {
      // eslint-disable-next-line
      console.error(err);
    });
  },
};

</script>

<style lang="stylus" scoped>
@import '~stylus_var'

.explore

  &__form-wrapper
    width 100%
    max-width 600px
    margin auto
    padding 40px 10px
    @media (min-width: 600px)
      padding 40px
      border 1px solid $purple

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
    margin 20px auto

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

  &__option
      -webkit-appearance: none;
      -moz-appearance: none;
      -ms-appearance: none;
      -o-appearance: none;
      appearance: none;
      position: relative;
      top: 4px;
      right: 0;
      bottom: 0;
      left: 0;
      height: 20px;
      width: 20px;
      transition: all 0.15s ease-out 0s;
      border: 2px solid $purple
      color: $purple
      cursor: pointer;
      display: block;
      margin-right: 0.5rem;
      position: relative;
      z-index: 10;

      & input
        z-index: -1
        opacity: 0
        width 100%
        display flex
        height 20px
        position relative


      &:hover
        background: $pink;

      &:checked
        background: $pink;

      &::before
        height: 12px;
        width: 12px;
        position: absolute;
        top: 2px;
        left: 2px;
        content: '';
        display: inline-block;
        border-radius: 100%;
        background-color: white;

        &:focus
          border-radius: 50%;

      &::after
        background: #40e0d0;
        content: '';
        display: block;
        position: relative;
        z-index: 100;

  &__type-title
    text-align center
    width 100%
    position absolute
    top -24px
    left 30px

  &__type-desc
    width 100%
    min-width 150px
    margin-left 60px
    padding-left 10px
    font-size .8em
    @media (min-width: 600px)
      min-width 400px

.tooltip {
    position: relative;
}

.tooltip .tooltiptext {
    visibility: hidden;
    width: 60%;
    background-color $purple
    color: white;
    border: 1px solid $purple
    position: absolute;
    z-index: 1;
    top: -5px;
    left: 110%;
    text-align: center
    padding 9px 10px 11px 10px
    line-height 1em
}

.tooltip .tooltiptext::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 100%;
    margin-top: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent $purple transparent transparent;
}
.tooltip:hover .tooltiptext {
    visibility: visible;
}

.active::before
  height: 12px;
  width: 12px;
  position: absolute;
  top: 2px;
  left: 2px;
  content: '';
  display: inline-block;
  border-radius: 100%;
  background-color: purple;

</style>

