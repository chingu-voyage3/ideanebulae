<template>
  <div class="container">

    <header>
      <h1 class="sr-only">Idea Nebulae</h1>
      <div class="splash__branding">
        <img class="splash__logo" src="../assets/idea-nebulae-logo.svg" alt=""/>
        <div class="splash__tagline">where ideas are born</div>
      </div>
      <button>start ideation</button>
    </header>

    <section id="features">
      <h2>You can...</h2>
      <div>
        <img src="../assets/people.svg" />
        <p>Get feedback from a helpful community</p>
      </div>
      <div>
        <img src="../assets/bulb.svg" />
        <p>Donate for someone to make it reality</p>
      </div>
      <div>
        <img src="../assets/lock.svg" />
        <p>Be assured your idea will not get stolen</p>
      </div>
    </section>

    <section id="idea-count">
      <h2>Ideas posted till now... <strong>12345</strong></h2>
      <button>start ideation</button>
    </section>

  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style lang="stylus" scoped>

.splash

  &__logo
    width 60%
    height auto
    margin auto

  &__branding
    display flex
    flex-direction column
    text-align center

  &__tagline
    text-transform uppercase
    font-weight 200
    font-size 2em
    letter-spacing 4px
    margin-top 40px



</style>
