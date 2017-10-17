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
            <input class="create__input" name="newTag" type="text" v-model="tagText" @keyup.enter="addTag" @keyup.188="addTag" @keyup.tab="addTag">
          </div>
        </div>

        <div class="create__form-element">
          <label class="create__label" for="create__links">Links to more info</label>
          <div class="create__info" v-if="links.length == 0">No links added yet</div>
          <div id="create__links" class="create__form__link" v-for="(link, index) in links">
            <div class="create__link">
              <a :href="link">{{link}}</a>
              <button id="remove__link" @click="removeLink(index)"> &#10006; </button>
            </div>
          </div>

          <div class="create__addlink">
            <div v-show="errors.has('newlink')">Invalid link</div>
            <label class="create__label" for="newlink">Add link</label>
            <input class="create__input" name="newlink" v-validate="'required|url'" data-vv-delay="1000" type="text" v-model="linkText" @keyup.enter="addLink">
            <button class="create__addlink-button"
            @click="addLink"> + </button>
          </div>
        </div>

        <div class="create__form-element">
          <label class="create__label" for="create__type">Type</label>
          <div class="create__radio-group">
            <div class="create__type" @mouseover="upHere = 0" @mouseleave="upHere = -1">
              <input type="radio" name="ideatype" v-validate="'required'" value="0" v-model="ideaType">
              <div class="create__type-title">Public</div>
              <div class="create__type-desc" v-if="upHere == 0">Anyone can read and give feedback</div>
            </div>
            <div class="create__type" @mouseover="upHere = 1" @mouseleave="upHere = -1" >
              <input type="radio" name="ideatype" value="1" v-model="ideaType">
              <div class="create__type-title">Private</div>
              <div class="create__type-desc" v-if="upHere == 1">Only visible to people who agree to the license</div>
            </div>
            <div class="create__type" @mouseover="upHere = 2" @mouseleave="upHere = -1" >
              <input type="radio" name="ideatype" value="2" v-model="ideaType">
              <div class="create__type-title">Custom</div>
              <div class="create__type-desc" v-if="upHere == 2">Customise the license and choose the people that see the idea</div>
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
    border 1px solid $purple
    padding 40px
    width 100%
    max-width 600px
    margin auto

  &__header
    text-align center
    color $purple
    margin-bottom 60px
    font-size 1.5em
    line-height 1.2em
      @media (min-width: 600px)
        font-size 36px

    & h1
      font-weight 200 !important

  &__label
    text-transform uppercase
    font-size .8em
    letter-spacing 2.5px
    font-weight 700
    display block

  &__input
    padding 10px
    width 100%
    margin-bottom 10px
    font-size 1em
    border 1px solid $purple

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

  &__type
    display inline-block
    width 33%

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
    background-color: $ltblue;
    background-color: rgba(255, 255, 255, 0.24);
    border-radius: 2px;
    border: 1px solid $gray_text;
    border: 1px solid rgba(84, 84, 84, 0.24);
    margin-right: 10px;
    margin-top: 5px;
    vertical-align: top;

    &:hover
      border: 1px solid $gray_bkgrd;
      border: 1px solid rgba(84, 84, 84, 0.6);


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
      border-right: 1px solid $ltblue;
      border-right: 1px solid rgba(0, 126, 255, 0.24);
      padding: 1px 5px 3px;

      &:hover
        // color: red;

</style>
