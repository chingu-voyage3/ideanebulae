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
          <textarea id="edit__desc" name="description" class="edit__textarea" cols="80" rows="13" maxlength="1000" v-model="ideaDesc" placeholder="Description" ></textarea>
        </div>

        <div class="edit__form-tags">
          <div class="edit__tag-wrap">
            <span class="edit__form-tag" v-for="(tag, index) in ideaTags" v-bind:key="index">
              <span class="edit__tag" >
                <span class="edit__tag__icon" aria-hidden="true">
                  <button
                    class="edit__tag__button"
                    @click="removeTag(index)">
                      &times;
                  </button>
                </span>
                <span class="edit__tag__label" role="option" aria-selected="true">
                    {{tag}}
                  <span class="tag-aria-only">&nbsp;</span>
                </span>
              </span>
            </span>
          </div>

          <div class="edit__addtag">
            <label class="edit__label" for="newTag">Add Tag</label>
            <div class="edit__input-wrap">
              <input class="edit__input" name="newTag" type="text" v-model="tagText" @keyup.enter="addTag" @keyup.188="addTag" @keyup.tab="addTag" placeholder="Add tags to help other users find your idea">
              <button class="edit__add-button"
            @click="addTag"> + </button>
            </div>
          </div>
        </div>

        <div class="edit__form-element">
          <div id="edit__links" class="edit__form__link" v-for="(link, index) in ideaDocuments" v-bind:key="index">
            <div class="edit__link">
              <a class="edit__link-text" :href="link.url" target="_blank">{{link.url_description}}</a>
              <button class="edit__remove-link" id="remove__link" @click="removeLink(index)"> &times; </button>
            </div>
          </div>

          <div class="edit__addlink">
            <div v-show="errors.has('newlink')">Invalid link</div>
            <label class="edit__label" for="newlink">Add link</label>
            <div class="edit__input-wrap">
              <input class="edit__input" name="newlink" v-validate="'url'" data-vv-delay="1000" type="text" v-model="linkText" @keyup.enter="addLink" placeholder="Links to more information about your idea">
              <button class="edit__add-button"
            @click="addLink"> + </button>
            </div>
          </div>
        </div>

        <div class="edit__form-element">
          <label class="edit__label" for="create__type">Type</label>
          <div class="edit__radio-group">
            <div class="edit__radio edit__option" v-bind:class="{ active: ideaTypeCode === PUBLIC_IDEA }" @mouseover="upHere = 0" @mouseleave="upHere = -1" @click="typeToggle(0)">
              <input type="radio" name="ideatype" v-validate="'required'" :value="PUBLIC_IDEA" v-model="ideaTypeCode">
              <div class="edit__type-title tooltip">Public
                <span class="edit__type-desc tooltiptext" v-if="upHere == 0">Anyone can read and give feedback</span>
              </div>
            </div>
            <div class="edit__radio edit__option" v-bind:class="{ active: ideaTypeCode === PRIVATE_IDEA }" @mouseover="upHere = 1" @mouseleave="upHere = -1" @click="typeToggle(1)">
              <input type="radio" name="ideatype" :value="PRIVATE_IDEA" v-model="ideaTypeCode">
              <div class="edit__type-title tooltip">Private
                <span class="edit__type-desc tooltiptext" v-if="upHere == 1">Only visible to people who agree to the license</span>
              </div>
            </div>
            <div class="edit__radio edit__option" v-bind:class="{ active: ideaTypeCode === COMMERCIAL_IDEA }" @mouseover="upHere = 2" @mouseleave="upHere = -1" @click="typeToggle(2)">
              <input type="radio" name="ideatype" :value="COMMERCIAL_IDEA" v-model="ideaTypeCode">
              <div class="edit__type-title tooltip">Custom
                <span class="edit__type-desc tooltiptext" v-if="upHere == 2">Customise the license and choose who can see the idea</span>
              </div>
            </div>
          </div>
        </div>
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
import http from '../../api/index';

export default {
  name: 'EditIdea',
  data() {
    return {
      // Idea information
      idea_id: '',
      ideaCreator: '',
      ideaTitle: '',
      ideaType: '',
      ideaTypeCode: '',
      ideaDesc: '',
      ideaTags: [],
      ideaDocuments: [],
      ideaAgreement: '',
      ideaReviews: [],
      // Page work variables
      origTitle: '',
      origType: '',
      linkText: '',
      tagText: '',
      upHere: '-1',
      addLinkError: false,
      // Constants
      PUBLIC_IDEA: 0,
      PRIVATE_IDEA: 1,
      COMMERCIAL_IDEA: 2,
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
          this.ideaCreator = response.data[0].creator;
          this.ideaTitle = response.data[0].title;
          this.origTitle = response.data[0].title;
          this.ideaType = response.data[0].type;
          this.origType = response.data[0].type;
          this.ideaTypeCode = response.data[0].typeCode;

          // eslint-disable-next-line no-underscore-dangle
          this.idea_id = response.data[0]._id;
          this.ideaDesc = response.data[0].description;
          this.ideaDocuments = response.data[0].documents;
          this.ideaTags = response.data[0].tags;
          if (response.data[0].agreement === null) {
            this.ideaAgreement = null;
          } else if (this.ideaTypeCode !== this.PUBLIC_IDEA) {
            this.ideaAgreement = response.data[0].agreement.agreement;
          }
          this.ideaReviews = response.data[0].reviews;
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
    addLink() {
      let newVal = this.linkText.trim();

      if (newVal.length === 0) {
        return;
      }

      this.$validator.validate('newlink', newVal)
      .then((result) => {
        if (result) {
          if (!/^http[s]?:\/\/.+/.test(newVal)) {
            newVal = `https://${newVal}`;
          }
          console.log(`newVal: ${newVal}`);
          this.ideaDocuments.push({ url_description: newVal, url: newVal });
          this.linkText = '';
        }
      });
    },
    addTag() {
      let newVal = this.tagText.trim();
      if (newVal[newVal.length - 1] === ',') {
        newVal = newVal.slice(0, -1);
      }
      if (newVal.length !== 0) {
        this.ideaTags.push(newVal);
        this.tagText = '';
      }
    },
    deleteIdea() {
      // TODO: Remove the idea from the database
    },
    removeLink(index) {
      this.ideaDocuments.splice(index, 1);
    },
    removeTag(index) {
      this.ideaTags.splice(index, 1);
    },
    typeToggle(type) {
      this.ideaTypeCode = type;
      this.ideaAgreement = (this.ideaTypeCode === this.PUBLIC_IDEA) ? '' : ' ';
    },
    saveIdea() {
      localstorage.setObject('edit-idea-save', this.$data);
    },
    updateIdea() {
      localStorage.removeItem('edit-idea-save');
      const newIdea = {
        creator: this.ideaCreator,
        title: this.ideaTitle,
        typeCode: this.ideaTypeCode,
        description: this.ideaDesc,
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
      http.put('/ideas', {
        origCreator: this.ideaCreator,
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
