<template>
  <div class="container profile">
    <header class="profile__header">
      <h1>Your Profile</h1>
    </header>

    <section>
      <div id="UserProfile" class="grid">
        <h2 class="profile__text r1c1">User ID:</h2>
        <h2 class="profile__text r1c2">{{ userId }}</h2>
      </div>
      <div class="grid">
        <h2 class="profile__text r1c1">User Name:</h2>
        <h2 class="profile__text r1c2">{{userName}}</h2>
      </div>
      <div class="grid">
        <h2 class="profile__text r1c1">Qualifications:</h2>
        <div class="profile__text r1c24">
          <input v-model="userQualifications" type="text" placeholder="Describe your qualifications"></input>
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

  &__text
    color $medblue

input { 
  width: 100%;
  height: 400px;
  box-sizing: border-box;
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
