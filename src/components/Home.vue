<template>
  <div class="container splash">

    <header class="splash__header">
      <h1 class="sr-only">Idea Nebulae</h1>
      <div class="splash__branding">
        <img class="splash__logo" src="../assets/idea-nebulae-logo.svg" alt=""/>
        <div class="splash__tagline">where ideas are born</div>
      </div>
      <div class="splash__button-wrap">
        <button class="btn btn__primary splash__button">Start Ideation</button>
      </div>
    </header>

    <section id="features" class="splash__features">
      <div class="splash__card-wrap">
        <div class="splash__card"
          @mouseenter="(e)=>{flip(e)}"
          @mouseleave="(e)=>{unflip(e)}">
          <div class="side front">
            <div class="splash__feature-text">Get<br/>Feedback</div>
            <img class="splash__card-img" src="../assets/feedback.svg" alt=""/>
          </div>
          <div class="side back">
            <div class="splash__back--head">Get Feedback</div>
            <img class="splash__card-img--back" src="../assets/feedback_w.svg" alt=""/>
            <div class="splash__back--body">Refine your idea with the help of a supportive community</div>
          </div>
        </div>
        <div class="splash__card"
          @mouseenter="(e)=>{flip(e)}"
          @mouseleave="(e)=>{unflip(e)}">
          <div class="side front">
            <div class="splash__feature-text">Share<br/>Securely</div>
            <img class="splash__card-img--sm" src="../assets/shield.svg" alt=""/>
          </div>
          <div class="side back">
            <div class="splash__back--head">Share Securely</div>
            <img class="splash__card-img--back" src="../assets/shield_w.svg" alt=""/>
            <div class="splash__back--body">Preserve your intellectual property rights when sharing</div>
          </div>
        </div>
        <div class="splash__card"
          @mouseenter="(e)=>{flip(e)}"
          @mouseleave="(e)=>{unflip(e)}">
          <div class="side front">
            <div class="splash__feature-text">Collaborate<br/>&amp; Launch</div>
            <img class="splash__card-img--med" src="../assets/rocket.svg" alt=""/>
          </div>
          <div class="side back">
            <div class="splash__back--head">Collaborate &amp; Launch</div>
            <img class="splash__card-img--back" src="../assets/rocket_w.svg" alt=""/>
            <div class="splash__back--body">Release your idea for development or recruit your dream team</div>
          </div>
        </div>
      </div>
    </section>

    <section id="idea-count" class="splash__counter">
      <div class="splash__number">140,257</div>
      <div class="splash__counter-text">Ideas born so far</div>
      <button class="btn btn__primary splash__button splash__button--btm">What's <strong>your</strong> idea?</button>
    </section>

  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    flip: (e) => {
      e.target.children[0].classList.add('flip');
      e.target.children[1].classList.add('flip');
    },
    unflip: (e) => {
      e.target.children[0].classList.remove('flip');
      e.target.children[1].classList.remove('flip');
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '~stylus_var'

/*
$purple = #7c48c2
$dkblue = #3023AE
$medblue = #4b83dc
$aqua = #00cbf7
$sky = #3877ce
$ltred = #ee4f5c
$dkred = #9a041a
*/

// colors should be global variables
// but i can't get them to import correctly from the global file

.splash

  &__header
    height 100vh
    display flex
    flex-direction column
    justify-content center

  &__logo
    width 60%
    height auto
    margin auto

  &__branding
    display flex
    flex-direction column
    text-align center
    margin 4vw auto

  &__tagline
    text-transform uppercase
    font-weight 200
    font-size 3.5vw
    letter-spacing 4px
    margin-top 4vw
    color $purple

  &__button-wrap
    display flex
    justify-content center
    margin 6vw auto

  &__button

    &--btm
        margin-top 10vh

    @media (min-width: 600px)
      font-size 2.5vw
      padding 1.2vw 3.2vw
      border-radius 6vw

      // check on big screens

    @media (min-width: 1200px)
      font-size 30px
      padding 12px 36px
      border-radius 60px


  &__features
    display flex
    flex-direction column
    justify-content center
    margin 20px
    height 100vh

  &__counter
    text-align center
    height 100vh

  &__card
    text-align center
    margin 20px
    height 30vw
    width 33%
    position relative

  &__card-wrap
    display flex
    justify-content center

  &__feature-text
    text-align center
    font-size 2em
    color $medblue
    min-height 2em
    margin-bottom 1em
    line-height 1.1em
    background $medblue
    background linear-gradient(-134deg, $aqua 0%, $sky 100%)
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

  &__card-img
    width 55%
    height auto

    &--sm
      width 40%

    &--med
      width 50%

    &--back
      width 30%

  &__back--head
    color white
    margin-bottom 20px
    font-size 1.3em
    letter-spacing 1px

  &__back--body
    color white
    margin-top 20px

  &__number
    margin 10vh auto 20px auto
    font-size 6em
    line-height 1em
    font-weight 700
    background $purple
    background linear-gradient(-134deg, $dkblue 0%, $pink 100%)
    background -webkit-linear-gradient(-134deg, $dkblue 0%, $pink 100%)
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

  &__counter-text
    color $purple
    font-size: 1.5em;




.flip


.front
  transform rotateY(0deg)
  overflow hidden
  z-index 1
  border 1px solid lighten($dkblue, 80%)

  &.flip
    transform: rotateY(180deg);
    transition:.5s ease-in-out;
    z-index 0

.side
  height 100%
  width 100%
  padding 30px
  transform-style:preserve-3d;
  backface-visibility:hidden !important;
  -webkit-backface-visibility:hidden !important;
  -moz-backface-visibility:hidden !important;
  background: rgba(255,255,255,.9);
  border-radius: 0;
  // box-shadow: 0 16px 24px rgba(0, 0, 0, 0.4);
  transition: .5s ease-in-out;
  position: relative;

.back
  transform:rotateY(180deg);
  z-index:2;
  line-height:1.5;
  position: absolute;
  top:0;
  left:0;
  background $medblue
  background linear-gradient(-134deg, $aqua 0%, $sky 100%)
  background -webkit-linear-gradient(-134deg, $aqua 0%, $sky 100%)

  &.flip
    transform: rotateY(360deg);
    transition:.5s ease-in-out;
    z-index 0




</style>
