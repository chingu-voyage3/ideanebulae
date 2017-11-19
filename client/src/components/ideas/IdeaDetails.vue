<template>
  <div class="container view">
    <header class="view__header">
      <h1 class="view__title">Idea Details</h1>
    </header>

    <section class="view__form-wrapper">
      <div class="view__form-group">

        <div class="view__form-element">
          <label class="view__label" for="view__creator">Creator</label>
          <input class="view__input" id="view__creator" maxlength="100" type="text" name="creator" v-model="ideaCreator" placeholder="Creator" autofocus disabled>
        </div>

        <div class="view__form-element">
          <label class="view__label" for="view__title">Title</label>
          <input class="view__input" id="view__title" maxlength="100" type="text" name="title" v-model="ideaTitle" placeholder="Title" autofocus disabled>
        </div>

        <div class="view__form-element">
          <label class="view__label" for="view__desc">Description</label>
          <div id="view__desc" name="description" class="view__textarea" >{{ideaDesc}}</div>
        </div>

        <div class="view__form-tags">
          <label class="view__label" for="view__tags">Tags</label>
          <div class="view__tag-wrap" id="view__tags">
            <span class="view__form-tag" v-for="(tag, index) in ideaTags" v-bind:key="index">
              <span class="view__tag" >
                <span class="view__tag__label" role="option" aria-selected="true">
                  {{tag}}
                  <span class="tag-aria-only">&nbsp;</span>
                </span>
              </span>
            </span>
          </div>
        </div>

        <div class="view__form-element">
          <label class="view__label" for="view__links">Links</label>
          <div class="view__link-wrap">
            <span id="view__links" class="view__links" v-for="(link, index) in ideaLinks" v-bind:key="index">
              <span class="view__link">
                <a :href="link.url" target="_blank">{{link.url_description}}</a>
              </span>
            </span>
        </div>
        </div>

        <div class="view__form-element">
          <label class="view__label" for="create__type">Type</label>
          <div class="view__radio-group">
            <div class="view__radio view__option" v-bind:class="{ active: ideaTypeCode === PUBLIC_IDEA }" @mouseover="upHere = 0" @mouseleave="upHere = -1">
              <input type="radio" name="ideatype" v-validate="'required'" :value="PUBLIC_IDEA" v-model="ideaTypeCode" disable>
              <div class="view__type-title tooltip">Public
                <span class="view__type-desc tooltiptext" v-if="upHere == PUBLIC_IDEA">Anyone can read and give feedback</span>
              </div>
            </div>
            <div class="view__radio view__option" v-bind:class="{ active: ideaTypeCode === PRIVATE_IDEA }" @mouseover="upHere = 1" @mouseleave="upHere = -1">
              <input type="radio" name="ideatype" :value="PRIVATE_IDEA" v-model="ideaTypeCode" disable>
              <div class="view__type-title tooltip">Private
                <span class="view__type-desc tooltiptext" v-if="upHere == PRIVATE_IDEA">Only visible to people who agree to the license</span>
              </div>
            </div>
            <div class="view__radio view__option" v-bind:class="{ active: ideaTypeCode === COMMERCIAL_IDEA }" @mouseover="upHere = 2" @mouseleave="upHere = -1">
              <input type="radio" name="ideatype" :value="COMMERCIAL_IDEA" v-model="ideaTypeCode" disable>
              <div class="view__type-title tooltip">Custom
                <span class="view__type-desc tooltiptext" v-if="upHere == COMMERCIAL_IDEA">Customise the license and choose who can see the idea</span>
              </div>
            </div>
          </div>
        </div>

        <div class="view__form-element" v-show="this.ideaTypeCode">
          <label class="view__label" for="view__agreement">Agreement</label>
          <textarea id="view__agreement" name="agreement" class="view__textarea" cols="80" rows="13" maxlength="1000" v-model="ideaAgreement" placeholder="Agreement" disabled></textarea>
        </div>

        <div class="view__form-element" v-show="this.ideaReviews.length">
          <label class="view__label" for="view__reviews">Reviews</label>
          <section class="view__results">
            <table class="view__table">
              <tr class="view__tr">
                <th class="view__th">Reviewer</th>
                <th class="view__th">Assigned</th>
                <th class="view__th">Updated</th>
                <th class="view__th">Comments</th>
              </tr>
              <tr class="view__tr" v-for="review in ideaReviews" v-bind:key="review.reviewer">
                <td class="view__td">{{review.reviewer}}</td>
                <td class="view__td">{{new Date(review.assigned_ts).toLocaleDateString()}}</td>
                <td class="view__td">{{new Date(review.updated_ts).toLocaleDateString()}}</td>
                <td class="view__td">{{review.comments}}</td>
              </tr>
            </table>
          </section>
        </div>

      </div>

      <div class="view__button-wrap">
        <button class="btn btn__primary profile__button view__button--btm" @click="editIdea">{{editButtonText}}</button>
      </div>
    </section>
  </div>
</template>

<script>
import { getUserProfile, getAccessToken } from '@/auth';
import http from '../../api/index';

export default {
  name: 'IdeaDetails',
  data() {
    return {
      // Session information
      currentUser: '',
      userRole: '',
      editButtonText: '',
      // Idea information
      idea_id: '',
      ideaCreator: '',
      ideaTitle: '',
      ideaType: '',
      ideaDesc: '',
      ideaTags: [],
      ideaLinks: [''],
      ideaAgreement: '',
      ideaReviews: [],
      ideaTypeCode: '0',
      upHere: '-1',
      // Constants
      PUBLIC_IDEA: 0,
      PRIVATE_IDEA: 1,
      COMMERCIAL_IDEA: 2,
    };
  },
  mounted() {
    // Get the profile for the currently logged in (i.e. session) user
    if (getAccessToken()) {
      getUserProfile()
      .then((profile) => {
        console.log('profile: ', profile);
        this.currentUser = profile.sub;

        // Retrieve the idea identified by the URL paramaters
        http.get(`/idea/?creator=${this.$route.params.creatorId}&title=${this.$route.params.title}&type=${this.$route.params.type}`)
        .then((response) => {
          console.log('IdeaDetails.vue > 143');
          console.log(response.data[0]);
          this.ideaCreator = response.data[0].creator;
          this.ideaTitle = response.data[0].title;
          // TODO: Calculate this as a virtual database field in Mongoose
          this.ideaType = response.data[0].type;
          switch (response.data[0].type) {
            case 'public':
              this.ideaTypeCode = this.PUBLIC_IDEA;
              break;
            case 'private':
              this.ideaTypeCode = this.PRIVATE_IDEA;
              break;
            case 'commercial':
              this.ideaTypeCode = this.COMMERCIAL_IDEA;
              break;
            default:
              throw new Error(`Invalid idea type field value: ${response.data[0].type}`);
          }

          // eslint-disable-next-line no-underscore-dangle
          this.idea_id = response.data[0]._id;
          this.ideaDesc = response.data[0].description;
          this.ideaLinks = response.data[0].documents;
          this.ideaTags = response.data[0].tags;
          if (response.data[0].agreement === null) {
            this.ideaAgreement = null;
          } else {
            this.ideaAgreement = response.data[0].agreement.agreement;
          }
          this.ideaReviews = response.data[0].reviews;
          this.userRole = (this.ideaCreator === this.currentUser) ? 'creator' : 'reviewer';
          this.editButtonText = (this.userRole === 'creator') ? 'Edit Idea' : 'Add/Update Review';
        })
        .catch((err) => {
          throw new Error(`Locating idea: ${err}`);
        });
      })
      .catch((err) => {
        throw new Error(`Accessing user security profile: ${err}`);
      });
    }
  },
  methods: {
    editIdea() {
      if (this.userRole === 'creator') {
        this.$router.push({ path: `/edit/${this.ideaCreator}/${this.ideaTitle}/${this.ideaType}` });
      } else {
        this.$router.push({ path: `/review/${this.ideaCreator}/${this.ideaTitle}/${this.ideaType}` });
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '~stylus_var'

.view

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

  &__input-wrap
    width 100%
    display flex
    margin-bottom 10px

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
    padding 0 0 20px
    width 100%
    font-size 1.5em
    color $purple
    border 0px transparent

    &:focus
      -webkit-box-shadow: 0 0 2px 0 rgba(110, 28, 233, 0.8);
      -moz-box-shadow: 0 0 2px 0 rgba(110, 28, 233, 0.8);
      box-shadow: 0 0 2px 0 rgba(110, 28, 233, 0.8);

  &__textarea
    width 100%
    padding 10px 0 20px
    font-family: 'Titillium Web', Helvetica, Arial, sans-serif
    font-size 1.2em
    color $purple
    border 0px transparent
    letter-spacing: 1px
    margin-bottom 10px

    &:focus
      -webkit-box-shadow: 0 0 2px 0 rgba(110, 28, 233, 0.8);
      -moz-box-shadow: 0 0 2px 0 rgba(110, 28, 233, 0.8);
      box-shadow: 0 0 2px 0 rgba(110, 28, 233, 0.8);

  &__type
    display inline-block
    width 33%

  &__link-wrap
    display flex
    flex-wrap wrap
    margin-bottom 20px

  &__links
    margin 10px

    &:first-child
      margin-left 0

    &:last-child
      margin-right 0

  &__link a
    color $purple
    text-decoration none
    border-bottom 1px dotted $purple

    &:hover, &:focus
      color $aqua
      text-decoration none
      border-bottom 1px dotted $aqua


  &__radio-group
    display flex
    width 100%

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


  &__tag
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
      padding: 2px 3px 3px 9px;
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
      border-right: 1px solid rgba(0, 126, 255, 0.24);
      padding: 1px 5px 3px;

      &:hover
        // color: red;

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


  &__radio-group
    padding: 10px 0;
    display flex
    flex-direction column
    width 100%

  &__radio
    margin: 0 5px 15px 0;
    padding: 1px;
    border-radius: 50%;
    display block
    text-align center

    &::after
      border-radius: 50%;

    &:focus
      border-radius: 50%;

  &__radio-label
    color: $gray_text;
    padding: 0 15px 0 0;

  &__radio-wrap
    display: inline-block;

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
