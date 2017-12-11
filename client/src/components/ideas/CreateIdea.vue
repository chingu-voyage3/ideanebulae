<template>
  <div class="container create">
    <header class="create__header">
      <h1 class="create__title">Create Idea</h1>
    </header>

    <section class="create__form-wrapper">
      <div class="create__form-group">

        <div class="create__form-element">
          <label class="create__label" for="create__title">Title</label>
          <input class="create__input" id="create__title" maxlength="100" type="text" name="title" v-model="ideaTitle" placeholder="Title" autofocus>
        </div>

        <div class="create__form-element">
          <label class="create__label" for="create__desc">Description</label>
          <AutosizeTextarea id="create__desc" name="description" class="create__textarea" maxlength="1000" v-if="!previewDesc" :value="ideaDesc" @update="updateIdeaDesc" placeholder="Idea Description (Accepts Markdown)" ></AutosizeTextarea>
          <div class="create__preview" v-else v-html="ideaDescMarked"></div>
          <div class="create__button-wrap create__button-wrap-preview">
            <button class="btn btn__primary profile__button create__button--btm" @click="previewDesc = !previewDesc">Toggle Preview</button>
          </div>
        </div>

        <IdeaTags :mode="'update'" :tags="this.ideaTags" v-on:tagschanged="tagsChanged"></IdeaTags>
        <IdeaLinks :mode="'update'" :links="this.ideaDocuments" v-on:linkschanged="linksChanged"></IdeaLinks>
        <IdeaType :mode="'update'" :type="this.ideaType" v-on:typechanged="typeChanged"></IdeaType>

      </div>
      <div class="create__button-wrap">
        <a class="btn btn__primary profile__button create__button--btm" href="/dashboard">Cancel</a>
        <button class="btn btn__primary profile__button create__button--btm" @click="submitIdea">Submit</button>
      </div>
    </section>
  </div>
</template>

<script>
import debounce from 'lodash.debounce';
import marked from 'marked';
import AutosizeTextarea from '@/components/misc/AutosizeTextarea';
import localstorage from '@/utils/localstorage';
import { PUBLIC_IDEA, PRIVATE_IDEA, COMMERCIAL_IDEA } from '@/../../server/models/ideaConstants';
import http from '../../api/index';
import IdeaLinks from '../shared/IdeaLinks';
import IdeaTags from '../shared/IdeaTags';
import IdeaType from '../shared/IdeaType';

export default {
  name: 'CreateIdea',
  components: {
    AutosizeTextarea,
    IdeaLinks,
    IdeaTags,
    IdeaType,
  },
  data() {
    return {
      // Idea Document Fields
      ideaTitle: '',
      ideaType: '',
      ideaDesc: '',
      ideaTags: [],
      ideaDocuments: [],
      // Session Work Fields
      ideaTypeCode: this.PUBLIC_IDEA,
      ideaDescMarked: '',
      previewDesc: false,
      // Constants
      // Note that constants are imported from files to maintain consistency across the app
      // but defined in this fashion so they are available to be referenced from HTML.
      PUBLIC: PUBLIC_IDEA,
      PRIVATE: PRIVATE_IDEA,
      COMMERCIAL: COMMERCIAL_IDEA,
    };
  },
  mounted() {
    const savedState = localstorage.getObject('create-idea-save');
    if (savedState != null) {
      Object.assign(this.$data, savedState);
    }
    this.$watch('$data',
      debounce(this.saveIdea, 1500, { trailing: true }),
      { deep: true },
    );
  },
  methods: {
    linksChanged(updatedLinks) {
      this.ideaDocuments = updatedLinks;
    },
    saveIdea() {
      localstorage.setObject('create-idea-save', this.$data);
      this.ideaDescMarked = marked(this.ideaDesc, {
        sanitize: true,
      });
    },
    submitIdea() {
      localStorage.removeItem('create-idea-save');
      const payload = {
        title: this.ideaTitle,
        typeCode: this.ideaTypeCode,
        description: this.ideaDesc,
        documents: this.ideaDocuments,
        tags: this.ideaTags,
      };
      http.post('/ideas', payload)
      .then((response) => {
        if (response.statusText !== 'OK') {
          throw new Error(`Error adding new idea document. ${response}`);
        } else {
          this.$router.push('/dashboard');
        }
      }).catch((err) => {
        throw new Error(`Error adding new idea document: ${err}`);
      });
    },
    tagsChanged(updatedTags) {
      this.ideaTags = updatedTags;
    },
    typeChanged(typeCode, typeName) {
      this.ideaTypeCode = typeCode;
      this.ideaType = typeName;
    },
    updateIdeaDesc(v) {
      this.ideaDesc = v;
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '~stylus_var'

.create

  &__form-element
    margin-top 10px

  &__preview
    padding 20px 0

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

  &__button-wrap-preview
    justify-content flex-end
    margin 0 auto

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
