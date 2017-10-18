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
          <textarea id="create__desc" name="description" class="create__textarea" cols="80" rows="13" maxlength="1000" v-model="ideaDesc" placeholder="Description" ></textarea>
        </div>

        <div class="create__form-tags">
          <div class="create__tag-wrap">
            <span class="create__form-tag" v-for="(tag, index) in tags">
              <span class="create__tag" >
                <span class="create__tag__icon" aria-hidden="true">
                  <button
                    class="create__tag__button"
                    @click="removeTag(index)">
                      &times;
                  </button>
                </span>
                <span class="create__tag__label" role="option" aria-selected="true">
                    {{tag}}
                  <span class="tag-aria-only">&nbsp;</span>
                </span>
              </span>
            </span>
          </div>

          <div class="create__addtag">
            <label class="create__label" for="newTag">Add Tag</label>
            <div class="create__input-wrap">
              <input class="create__input" name="newTag" type="text" v-model="tagText" @keyup.enter="addTag" @keyup.188="addTag" @keyup.tab="addTag" placeholder="Add tags to help other users find your idea">
              <button class="create__add-button"
            @click="addTag"> + </button>
            </div>
          </div>
        </div>

        <div class="create__form-element">
          <div id="create__links" class="create__form__link" v-for="(link, index) in links">
            <div class="create__link">
              <a :href="link">{{link}}</a>
              <button class="create__remove-link" id="remove__link" @click="removeLink(index)"> &times; </button>
            </div>
          </div>

          <div class="create__addlink">
            <div v-show="errors.has('newlink')">Invalid link</div>
            <label class="create__label" for="newlink">Add link</label>
            <div class="create__input-wrap">
              <input class="create__input" name="newlink" v-validate="'required|url'" data-vv-delay="1000" type="text" v-model="linkText" @keyup.enter="addLink" placeholder="Links to more information about your idea">
              <button class="create__add-button"
            @click="addLink"> + </button>
            </div>
          </div>
        </div>

        <div class="create__form-element">
          <label class="create__label" for="create__type">Type</label>
          <div class="create__radio-group">
            <div class="create__radio create__option" v-bind:class="{ active: ideaType === 0 }" @mouseover="upHere = 0" @mouseleave="upHere = -1" @click="typeToggle(0)">
              <input type="radio" name="ideatype" v-validate="'required'" value="0" v-model="ideaType">
              <div class="create__type-title tooltip">Public
                <span class="create__type-desc tooltiptext" v-if="upHere == 0">Anyone can read and give feedback</span>
              </div>
            </div>
            <div class="create__radio create__option" v-bind:class="{ active: ideaType === 1 }" @mouseover="upHere = 1" @mouseleave="upHere = -1" @click="typeToggle(1)">
              <input type="radio" name="ideatype" value="1" v-model="ideaType">
              <div class="create__type-title tooltip">Private
                <span class="create__type-desc tooltiptext" v-if="upHere == 1">Only visible to people who agree to the license</span>
              </div>
            </div>
            <div class="create__radio create__option" v-bind:class="{ active: ideaType === 2 }" @mouseover="upHere = 2" @mouseleave="upHere = -1" @click="typeToggle(2)">
              <input type="radio" name="ideatype" value="2" v-model="ideaType">
              <div class="create__type-title tooltip">Custom
                <span class="create__type-desc tooltiptext" v-if="upHere == 2">Customise the license and choose who can see the idea</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="create__button-wrap">
        <a class="btn btn__primary profile__button create__button--btm" href="/dashboard">Cancel</a>
        <button class="btn btn__primary profile__button create__button--btm" @click="submitIdea">Submit</button>
      </div>
    </section>
  </div>
</template>

<script>

export default {
  name: 'CreateIdea',
  data() {
    return {
      ideaTitle: '',
      ideaDesc: '',
      linkText: '',
      tagText: '',
      ideaType: '0',
      upHere: '-1',
      addLinkError: false,
      tags: [],
      links: [
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      ],
    };
  },
  methods: {
    addLink() {
      let newVal = this.linkText.trim();
      this.$validator.validate('newlink', newVal)
      .then((result) => {
        if (result) {
          if (!/^http[s]?:\/\/.+/.test(newVal)) {
            newVal = `https://${newVal}`;
          }

          this.links.push(newVal);
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
        this.tags.push(newVal);
        this.tagText = '';
      }
    },
    removeLink(index) {
      this.links.splice(index, 1);
    },
    removeTag(index) {
      this.tags.splice(index, 1);
    },
    typeToggle(type) {
      console.log(type);
      this.ideaType = type;
    },
    submitIdea() {
      // const payload = {
      //   ideaTitle: this.ideaTitle,
      //   ideaDesc: this.ideaDesc,
      //   links: this.links,
      // };
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '~stylus_var'

.create

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

  &__remove-link
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
