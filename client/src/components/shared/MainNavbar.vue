<template>
  <nav class="nav">
    <div class="nav__menu">
      <button class="btn btn__primary splash__button nav__item" v-show="isLoggedIn()">{{ loggedUserNickname }}</button>
      <button class="btn btn__primary splash__button nav__item" v-show="!isLoggedIn()" @click="handleLogin()">Login</button>
      <button class="btn btn__primary splash__button nav__item" v-show="isLoggedIn()" @click="handleLogout()">Logout</button>
    </div>
  </nav>
</template>

<script>
import { isLoggedIn, login, logout } from '@/auth';

export default {
  name: 'MainNavbar',

  computed: {
    loggedUserNickname() {
      return this.$store.state.profile.nickname;
    },
  },

  methods: {
    handleLogin() {
      login();
    },

    handleLogout() {
      logout();
    },

    isLoggedIn() {
      return isLoggedIn();
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '~stylus_var'

.nav

  &__menu
    width 100%
    display flex
    justify-content flex-end
    list-style-type none
    padding 20px

  &__item
    text-transform uppercase

</style>
