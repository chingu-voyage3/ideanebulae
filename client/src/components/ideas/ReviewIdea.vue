<template>
  <div class="container view">
    <header class="review__header">
      <h1 class="review__title">Review Idea</h1>
    </header>

    <section class="review__form-wrapper">
      <div class="review__form-group">

        <div class="review__form-element">
          <label class="review__label" for="review__creator">Creator</label>
          <input class="review__input" id="review__creator" maxlength="100" type="text" name="creator" v-model="ideaCreatorName" placeholder="Creator" autofocus disabled>
        </div>

        <div class="review__form-element">
          <label class="review__label" for="review__title">Title</label>
          <input class="review__input" id="review__title" maxlength="100" type="text" name="title" v-model="ideaTitle" placeholder="Title" autofocus disabled>
        </div>

        <div class="review__form-element">
          <label class="review__label" for="review__desc">Description</label>
          <div id="review__desc" name="description" class="review__textarea" >{{ideaDesc}}</div>
        </div>

        <IdeaTags :tags="this.ideaTags"></IdeaTags>
        <IdeaLinks :links="this.ideaLinks"></IdeaLinks>
        <IdeaType :type="this.ideaType"></IdeaType>

        <div class="review__form-element" v-show="this.ideaType !== IDEATYPES[PUBLIC].name">
          <label class="review__label" for="review__agreement">Agreement</label>
          <textarea id="review__agreement" name="agreement" class="review__textarea" cols="80" rows="13" maxlength="1000" v-model="ideaAgreement" placeholder="Agreement" disabled></textarea>
        </div>

        <div class="review__form-element">
          <h3 class="review__subhead" for="review__reviews">Reviews</h3>
          <section class="review__results">
            <label class="review__label" for="review__comments">Comments</label>
            <textarea id="review__comments" name="comments" class="review__textarea review__textarea--editable" cols="80" rows="13" maxlength="1000" v-model="reviewComments" placeholder="Your review here..."></textarea>
          </section>
        </div>

      </div>

      <div class="review__button-wrap">
        <a class="btn btn__primary review__button review__button--btm" href="/dashboard">Cancel</a>
        <button class="btn btn__primary review__button review__button--btm" @click="updateReview">{{reviewButtonText}}</button>
      </div>
    </section>
  </div>
</template>

<script>
import { getUserProfile, getAccessToken } from '@/auth';
import { PUBLIC_IDEA, PRIVATE_IDEA, COMMERCIAL_IDEA, IDEA_TYPES } from '../../../../server/db/misc/ideaConstants';
import http from '../../api/index';
import IdeaLinks from '../shared/IdeaLinks';
import IdeaTags from '../shared/IdeaTags';
import IdeaType from '../shared/IdeaType';

export default {
  name: 'ReviewIdea',
  components: {
    IdeaLinks,
    IdeaTags,
    IdeaType,
  },
  data() {
    return {
      // Session information
      currentUser: '',
      userRole: '',
      reviewButtonText: '',

      // Idea information
      ideaId: '',
      ideaCreatorName: '',
      ideaCreatorProfileId: '',
      ideaTitle: '',
      ideaType: '',
      ideaDesc: '',
      ideaTags: [],
      ideaLinks: [''],
      ideaAgreement: '',
      ideaReviews: [],

      // Review information
      reviewIndex: this.NEW_REVIEW,
      reviewerId: '',
      reviewAssigned: '',
      reviewUpdated: '',
      reviewComments: '',

      // Constants
      // Note that constants are imported from files to maintain consistency across the app
      // but defined in this fashion so they are available to be referenced from HTML.
      PUBLIC: PUBLIC_IDEA,
      PRIVATE: PRIVATE_IDEA,
      COMMERCIAL: COMMERCIAL_IDEA,
      IDEATYPES: IDEA_TYPES,

      NEW_REVIEW: -1,
    };
  },
  mounted() {
    // Get the profile for the currently logged in (i.e. session) user
    if (getAccessToken()) {
      getUserProfile()
      .then((profile) => {
        this.currentUser = profile.sub;

        // Retrieve the idea identified by the URL parameters
        http.get(`/idea/?creator=${this.$route.params.creatorId}&title=${this.$route.params.title}&type=${this.$route.params.type}`)
        .then((response) => {
          const idea = response.data.idea;
          this.ideaCreatorName = idea.user_id;
          this.ideaCreatorProfileId = idea.profile_id;
          this.ideaTitle = idea.title;
          this.ideaType = idea.idea_type;

          // eslint-disable-next-line no-underscore-dangle
          this.ideaId = idea.id;
          this.ideaDesc = idea.description;
          this.ideaLinks = idea.documents;
          this.ideaTags = idea.tags;
          if (idea.agreement === null) {
            this.ideaAgreement = null;
          } else {
            this.ideaAgreement = idea.agreement.agreement;
          }
          this.ideaReviews = idea.reviews;
          this.reviewIndex = this.ideaReviews.findIndex(element =>
            element.reviewer === this.currentUser,
          );
          if (this.reviewIndex === this.NEW_REVIEW) {
            this.reviewButtonText = 'Add Review';
          } else {
            this.reviewButtonText = 'Update Review';
            this.reviewerId = this.ideaReviews[this.reviewIndex].reviewer_id;
            this.reviewComments = this.ideaReviews[this.reviewIndex].comments;
          }
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
    /**
     * @description Add a new review or update the review if it already exists.
     */
    updateReview() {
      // Add a new review
      if (this.reviewIndex === this.NEW_REVIEW) {
        console.log('Adding a new review');
        http.post(`/review/?ideaid=${this.ideaId}&reviewername=${this.currentUser}`,
          {
            idea_profile_id: this.ideaCreatorProfileId,
            idea_type: this.ideaType,
            idea_title: this.ideaTitle,
            comment: this.reviewComments,
          },
        )
        .then((response) => {
          console.log('response: ', response);
          if (response.data.ok !== 1) {
            throw new Error('Failed to add a review to idea document. ', response.data);
          } else {
            this.$router.push('/dashboard');
          }
        }).catch((err) => {
          throw new Error('Failed to add an idea review: ', err);
        });
      } else {
      // Update an existing review with the new comments
        http.put(`/review/?ideaid=${this.ideaId}&reviewerid=${this.reviewerId}`,
          {
            comment: this.reviewComments,
          },
        )
        .then((response) => {
          if (response.data[0] !== 1) {
            throw new Error('Failed to update an idea document. response: ', response);
          } else {
            this.$router.push('/dashboard');
          }
        }).catch((err) => {
          throw new Error('Failed to update an idea review: ', err);
        });
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '~stylus_var'

.review

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

  &__subhead
    color $purple
    font-size 1.2em
    margin 20px 0
    padding-bottom: 10px;
    border-bottom: 1px dotted $purple;
    font-weight 200 !important
    @media (min-width: 600px)
      font-size 30px

  &__date-wrap
    display flex
    justify-content space-between
    margin-bottom: 20px

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
    padding 10px 0
    width 100%
    font-size 1.5em
    border 0px transparent
    color $purple

    &--editable
      padding 0 0 20px
      width 100%
      font-size 1em
      color $gray_text
      border 1px solid $purple

      &:focus
        -webkit-box-shadow: 0 0 2px 0 rgba(110, 28, 233, 0.8);
        -moz-box-shadow: 0 0 2px 0 rgba(110, 28, 233, 0.8);
        box-shadow: 0 0 2px 0 rgba(110, 28, 233, 0.8);

  &__textarea
    width 100%
    padding 10px 0 20px
    font-size 1em
    font-family: 'Titillium Web', Helvetica, Arial, sans-serif
    color: $purple
    letter-spacing: 1px
    line-height: 1.5em
    border 0px transparent
    margin-bottom 10px

    &--editable
      padding 20px
      font-size 1.2em
      color $gray_text
      border 1px solid $purple

      &:focus
        -webkit-box-shadow: 0 0 2px 0 rgba(110, 28, 233, 0.8);
        -moz-box-shadow: 0 0 2px 0 rgba(110, 28, 233, 0.8);
        box-shadow: 0 0 2px 0 rgba(110, 28, 233, 0.8);

  &__type
    display inline-block
    width 33%

  &__link
    margin 10px 0

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
    border: 1px solid rgba(0, 126, 255, 0.24);
    margin-right: 10px;
    margin-top: 5px;
    vertical-align: top;

    &:hover
      border: 1px solid $gray_bkgrd;


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