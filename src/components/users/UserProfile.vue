<template>
  <div class="container profile">
    <header class="profile__header">
      <h1>Your Profile</h1>
    </header>

    <section>
      <div id="UserProfile" class="grid">
        <div class="profile__head r1c1">User ID:</div>
        <div class="profile__text r1c2">{{ userId }}</div>
      </div>
      <div class="grid">
        <div class="profile__head r1c1">User Name:</div>
        <div class="profile__text r1c2">{{userName}}</div>
      </div>
      <div class="grid">
        <div class="profile__text r1c1">Qualifications:</div>
        <div class="profile__text r1c24">
          <input v-model="userQualifications" class="input__align" type="text" placeholder="Describe your qualifications"></input>
        </div>
      </div>
      <div class="grid">
        <div class="r1c24">
          <button v-on:click="saveQualifications($event)" class="btn btn__primary profile__button profile__button--btm">Save</button>
          <button v-on:click="cancelQualifications($event)" class="btn btn__primary profile__button profile__button--btm">Cancel</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'UserProfile',
    data() {
      return {
        userId: 'xenon',
        userName: 'Jill Toscadera',
        userQualifications: ' ',
      };
    },
    methods: {
      saveQualifications: (event) => {
        console.log(`Save was pressed. Event:${event}`);
      },
      cancelQualifications: (event) => {
        console.log(`Cancel was pressed. Event:${event}`);
      },
    },
  };
</script>

<style lang="stylus" scoped>
@import '~stylus_var'

.profile

  &__header
    height calc(20vh - 84px)
    display flex
    flex-direction column
    justify-content center
    color $purple

  &__button-wrap
    display flex
    justify-content center
    margin 6vw auto

  &__button

    &--btm
        margin-top 1vh

  &__head
    color $medblue
    font-size 1.5em
    letter-spacing 1px

  &__text
    color $medblue
    font-size 1.5em


input { 
  width: 100%;
  height: 400px;
  box-sizing: border-box;
}

.input__align {
    text-align: left;
    padding: 1em .5em 400px;
  }

.grid {
  display: grid;
  grid-template-columns: repeat(5, 20%);
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
  grid-row: 1 / 5;
  grid-column: 2 / 5;
  text-align: center;
}

</style>
