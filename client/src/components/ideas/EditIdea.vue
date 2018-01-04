<template>
  <div class="container edit">
    <header class="edit__header">
      <h1 class="edit__title">Edit Idea</h1>
    </header>

    <section class="edit__form-wrapper">
      <div class="edit__form-group">

        <div class="edit__form-element">
          <label class="edit__label" for="edit__title">Title</label>
          <input class="edit__input" id="edit__title" maxlength="100" type="text" name="title" v-model="ideaTitle" placeholder="Title" autofocus>
        </div>

        <div class="edit__form-element">
          <label class="edit__label" for="edit__desc">Description</label>
          <textarea id="edit__desc" name="description" class="edit__textarea" cols="80" rows="13" maxlength="1000" v-model="ideaDescription" placeholder="Description" ></textarea>
        </div>

        <IdeaTags :mode="'update'" :tags="this.ideaTags" v-on:tagschanged="tagsChanged"></IdeaTags>
        <IdeaLinks :mode="'update'" :links="this.ideaDocuments" v-on:linkschanged="linksChanged"></IdeaLinks>
        <IdeaType :mode="'update'" :type="this.ideaType" v-on:typechanged="typeChanged"></IdeaType>

      </div>

      <div class="edit__form-element" v-show="this.ideaAgreement">
        <label class="edit__label" for="edit__agreement">Agreement</label>
        <textarea id="edit__agreement" name="agreement" class="edit__textarea" cols="80" rows="13" maxlength="1000" v-model="ideaAgreement" placeholder="Agreement"></textarea>
      </div>

      <div class="edit__button-wrap">
        <a class="btn btn__primary profile__button edit__button--btm" href="/dashboard">Cancel</a>
        <button class="btn btn__primary profile__button edit__button--btm" @click="updateIdea">Update</button>
        <button class="btn btn__primary profile__button edit__button--btm" @click="deleteIdea">Delete</button>
      </div>
    </section>
  </div>
</template>

<script>
import { getUserProfile, getAccessToken } from '@/auth';
import localstorage from '@/utils/localstorage';
// eslint-disable-next-line no-unused-vars
import { PUBLIC_IDEA, PRIVATE_IDEA, COMMERCIAL_IDEA, IDEA_TYPES } from '@/../../server/db/misc/ideaConstants';
import http from '../../api/index';
import IdeaLinks from '../shared/IdeaLinks';
import IdeaTags from '../shared/IdeaTags';
import IdeaType from '../shared/IdeaType';

export default {
  name: 'EditIdea',
  components: {
    IdeaLinks,
    IdeaTags,
    IdeaType,
  },
  data() {
    return {
      // Idea information
      ideaId: '',
      ideaCreatorId: '',
      ideaTitle: '',
      ideaType: '',
      ideaDescription: '',
      ideaTags: [],
      ideaDocuments: [],
      ideaAgreement: '',
      ideaReviews: [],

      // Page work variables
      ideaTypeCode: '',
      origTitle: '',
      origType: '',

      // Constants
      // Note that constants are imported from files to maintain consistency
      // across the app but defined in this fashion so they are available to
      // be referenced from HTML.
      PUBLIC: PUBLIC_IDEA,
      PRIVATE: PRIVATE_IDEA,
      COMMERCIAL: COMMERCIAL_IDEA,
      IDEATYPES: IDEA_TYPES,
    };
  },
  mounted() {
    const savedState = localstorage.getObject('edit-idea-save');
    if (savedState != null) {
      Object.assign(this.$data, savedState);
    }
    // Get the profile for the currently logged in (i.e. session) user
    if (getAccessToken()) {
      getUserProfile()
      .then((profile) => {
        this.currentUser = profile.sub;

        // Retrieve the idea identified by the URL paramaters
        http.get(`/idea/?creator=${this.$route.params.creatorId}&title=${this.$route.params.title}&type=${this.$route.params.type}`)
        .then((response) => {
          const idea = response.data.idea;
          this.idea_id = idea.ideaId;
          this.ideaCreatorId = idea.ideaCreatorId;
          this.ideaTitle = idea.ideaTitle;
          this.origTitle = idea.ideaTitle;
          this.ideaType = idea.ideaType;
          this.origType = idea.ideaType;
          this.ideaDescription = idea.ideaDescription;
          this.ideaTags = idea.ideaTags;
          this.ideaDocuments = idea.documents;
          this.ideaReviews = idea.reviews;
          // Determine the numeric value of the idea type string
          this.ideaTypeCode = IDEA_TYPES.findIndex(element =>
            element.name === this.ideaType,
          );
          if (this.ideaTypeCode === -1) {
            throw new Error(`Invalid idea type encountered displaying idea details. type: ${this.ideaType}`);
          }
          // Determine the value of the agreement string based on the idea type
          if (idea.agreement === null) {
            this.ideaAgreement = null;
          } else if (this.ideaTypeCode !== this.PUBLIC) {
            this.ideaAgreement = idea.agreement.agreement;
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
    deleteIdea() {
      http.delete('/ideas', {
        params: {
          ideaId: this.ideaId,
        },
      })
      .then((response) => {
        if (response === null) {
          throw new Error(`Deleting idea: ${response}`);
        }
      })
      .catch((err) => {
        throw new Error('Deleting idea: ', err);
      });
    },
    linksChanged(updatedLinks) {
      this.ideaDocuments = updatedLinks;
    },
    tagsChanged(updatedTags) {
      this.ideaTags = updatedTags;
    },
    typeChanged(typeCode, typeName) {
      this.ideaTypeCode = typeCode;
      this.ideaType = typeName;
      this.ideaAgreement = (this.ideaTypeCode === this.PUBLIC) ? '' : ' ';
    },
    saveIdea() {
      localstorage.setObject('edit-idea-save', this.$data);
    },
    updateIdea() {
      localStorage.removeItem('edit-idea-save');
      const newIdea = {
        creator: this.ideaCreatorId,
        title: this.ideaTitle,
        type: this.ideaType,
        description: this.ideaDescription,
      };

      if (this.ideaTags.length > 0) {
        newIdea.tags = this.ideaTags;
      }
      if (this.ideaDocuments.length > 0) {
        newIdea.documents = this.ideaDocuments;
      }
      if (this.ideaAgreement !== null && this.ideaAgreement.length > 0) {
        newIdea.agreement = this.ideaAgreement.trim();
      }
      if (this.ideaReviews.length > 0) {
        newIdea.reviews = this.ideaReviews;
      }
      http.put('/idea/', {
        origCreator: this.ideaCreatorId,
        origTitle: this.origTitle,
        origType: this.origType,
        newIdea,
      })
      .then((response) => {
        if (response === null) {
          throw new Error(`Updating idea: ${response}`);
        }
      })
      .catch((err) => {
        throw new Error('Updating idea: ', err);
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '~stylus_var'

.edit

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

  &__link
    display inline-block
    margin 10px 0

  &__link-text
    text-decoration none
    color $purple
    border-bottom 1px dotted $purple
    &:hover, &:focus, &:active
      color $aqua
      border-bottom 1px dotted $aqua
      transition color 300ms linear


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

  &__remove-link
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    color: inherit;
    cursor: pointer;
    font-size: 1em;
    border: 1px solid rgba(124,72,194, 0.25);
    padding: 0 4px 2px;
    margin-left 10px

    &:hover
      border: 1px solid rgb(124,72,194);

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
    height 21px
    width 21px

    &::after
      border-radius: 50%;

      &:hover
        background: $pink;

    &:focus
      border-radius: 50%;

  &__radio-label
    color: $gray_text;
    padding: 0 15px 0 0;

  &__radio-wrap
    display: inline-block;

.active::before
  height: 19px;
  width: 19px;
  position: absolute;
  top: -1px;
  left: -1px;
  border: 3px solid white
  content: '';
  display: inline-block;
  border-radius: 100%;
  background-color: $purple

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



</style>
