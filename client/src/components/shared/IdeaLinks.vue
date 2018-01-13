<template id="idea-links">
  <div class="links__form-element">
    <label class="links__label" v-show="this.ideaLinks.length > 0">Links</label>
    <div class="links__link-wrap">
      <span id="links__links" v-for="(link, index) in ideaLinks" v-bind:key="index">
        <span class="links__link">
          <div v-if="mode === 'update'">
            <a class="links__link-text" :href="link.url" target="_blank">{{link.description}}</a>
            <button class="create__remove-link" id="remove__link" @click="removeLink(index)"> &times; </button>
          </div>
          <div v-else>
            <a :href="link.url" target="_blank">{{link.url_description}}</a>
          </div>
        </span>
      </span>
    </div>

    <div v-if="mode === 'update'">
      <div class="links__addlink">
        <div v-show="errors.has('newlink')">Invalid link</div>
          <label class="links__label" for="newlink">Add link</label>
          <div class="links__input-wrap">
            <input class="links__input" name="newlink" v-validate="'url'" data-vv-delay="1000" type="text" v-model="linkText" @keyup.enter="addLink" placeholder="Links to more information about your idea">
            <button class="links__add-button" @click="addLink"> + </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'IdeaLinks',
  props: {
    links: { type: Array, required: true },
    mode: { type: String, required: false },
  },
  data() {
    return {
      linkText: '',
    };
  },
  computed: {
    // Make a deep copy of the input links array
    ideaLinks() {
      return JSON.parse(JSON.stringify(this.links));
    },
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
          this.linkText = '';
          this.ideaLinks.push({ url_description: newVal, url: `${newVal}` });
        }
      });
      this.$emit('linkschanged', this.ideaLinks);
    },
    removeLink(index) {
      this.ideaLinks.splice(index, 1);
      this.$emit('linkschanged', this.ideaLinks);
    },

  },
};
</script>

<style lang="stylus" scoped>
@import '~stylus_var'

.links

  &__form-wrapper
    width 100%
    max-width 600px
    margin auto
    padding 40px 10px
    @media (min-width: 600px)
      padding 40px
      border 1px solid $purple

  &__label
    text-transform uppercase
    font-size .8em
    letter-spacing 2.5px
    font-weight 700
    display block

  &__link-wrap
    display flex
    flex-wrap wrap
    margin-bottom 20px

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

  &__link
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
