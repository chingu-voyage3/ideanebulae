<template>
  <div class="container profile">
    <header class="profile__header">
      <h1>User Profile</h1>
    </header>

    <section>
      <div class="wrapper">
        <h2 class="r1c1">User ID:</h2>
        <h2 class="r1c2">xenon</h2>
      </div>
      <div class="wrapper">
        <h2 class="r1c1">User Name:</h2>
        <h2 class="r1c2">Jim Medlock</h2>
      </div>
      <div class="wrapper">
        <h2 class="r1c1">Qualifications:</h2>
        <div class="r1c24">
          <input id="profile__qualifications-text" v-model="userQualificaitons" placeholder="Enter your qualifications"></input>
        </div>
      </div>
      <div class="wrapper">
        <div class="r1c24">
          <button class="btn btn__primary profile__button profile__button--btm">Save</button>
          <button class="btn btn__primary profile__button profile__button--btm">Cancel</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'UserProfile',
  data: {
    userQualificaitons: ' ',
  },
};
</script>

<style lang="stylus" scoped>

.profile

  &__header
    height calc(20vh - 84px)
    display flex
    flex-direction column
    justify-content center

  &__qualifications-text
    color $purple
    font-size: 32px

  &__button-wrap
    display flex
    justify-content center
    margin 6vw auto

  &__button

    &--btm
        margin-top 1vh

.h1
  color: black;
  
.h2
  color: black;

.wrapper {
  display: grid;
  grid-template-columns: repeat(4, 25%);
  grid-template-rows: repeat(2, 10px);
  grid-row-gap: 15px;
}
.r1c1 {
  grid-row: 1;
  grid-column: 1;
}
.r1c2 { 
  grid-row: 1;
  grid-column: 2;
}
.r1c24 {
  grid-row: 1;
  grid-column: 2 / 4;
}

</style>
