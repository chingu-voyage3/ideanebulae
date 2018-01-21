<template>
  <div class="container dashboard">
    <header class="dashboard__header">
      <h1 class="dashboard__title">Dashboard</h1>
    </header>
    <section class="dashboard__results" >
      <table class="dashboard__table">
        <tr class="dashboard__tr">
          <th class="dashboard__th">Idea</th>
          <th class="dashboard__th">Type</th>
          <th class="dashboard__th">Status</th>
          <th class="dashboard__th">Reviews</th>
        </tr>
        <tr class="dashboard__tr" v-bind:key="index" v-for="(idea, index) in ideas">   
          <td class="dashboard__td">
            <router-link :to="`/ideas/${currUser}/${idea.idea.title}/${idea.idea.idea_type}`">
              {{ idea.idea.title }}
            </router-link>
          </td>
          <td class="dashboard__td">{{ idea.idea.idea_type }}</td>
          <td class="dashboard__td">{{ idea.idea.status }}</td>
          <td class="dashboard__td">{{ idea.idea.reviews.length }}</td>
        </tr>
      </table>
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
import http from '../../api/index';
import filters from '../../filters';

export default {
  name: 'Dashboard',
  data() {
    return {
      ideas: [],
      hoverOver: -1,
      currUser: '',
      searchForTags: [],
      searchForKeywords: [],
    };
  },
  filters,
  mounted() {
    if (getAccessToken()) {
      getUserProfile()
      .then((profile) => {
        this.currUser = profile.sub;
        // Get the profile for the currently logged in (i.e. session) user
        http.get(`/ideas/search/?currUser=${this.currUser}&searchForTags=${this.searchForTags}&searchForKeywords=${this.searchForKeywords}`)
        .then((response) => {
          if (response.statusText !== 'OK') {
            throw new Error(`Error fetching ideas. ${response}`);
          }
          this.$data.ideas = response.data;
        }).catch((err) => {
          throw new Error(`Error fetching ideas: ${err}`);
        });
      });
    }
  },
};
</script>

<style lang="stylus" scoped>
@import '~stylus_var'

.dashboard

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
    &:nth-child(4)
      text-align center
    &:last-child
      text-align center
      max-width 25px
      padding-right 0

  &__link
    text-decoration none
    color $purple
    border-bottom 1px dotted $purple
    cursor pointer
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
    border: 1px solid $gray_bkgrd;
    margin-right: 10px;
    margin-top: 5px;
    vertical-align: top;

    &:hover
      border: 1px solid $aqua;


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
