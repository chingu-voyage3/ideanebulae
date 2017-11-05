<template>
  <nav class="nav">
    <div class="nav__menu">
      <div class="nav__menu--left">
        <router-link :to="'/dashboard'" class="btn btn__primary splash__button nav__item nav__item--left">
          Dashboard
        </router-link>
        <router-link :to="'/explore'" class="btn btn__primary splash__button nav__item nav__item--left">
          Ideas
        </router-link>
        <router-link :to="'/create'" class="btn btn__primary splash__button nav__item nav__item--left">
          New Idea
        </router-link>
      </div>
      <div class="nav__menu--right">
        <router-link
        :to="'/profile/' + loggedUserNickname"
        class="btn nav__avatar"
        v-show="isLoggedIn()">
        <div class="nav__image-aspect">
          <div class="nav__image-crop">
            <div
              class="nav__image"
              :style="{ backgroundImage: `url(${loggedUserAvatarUrl})`, backgroundSize: 'cover', backgroundPosition: 'center center', }"
              role="image"
              :aria-label="loggedUserNickname"
              />
          </div>
        </div>
      </router-link>
      <button class="btn btn__primary splash__button nav__item" v-show="!isLoggedIn()" @click="handleLogin()">Login</button>
      <button class="btn btn__primary splash__button nav__item" v-show="isLoggedIn()" @click="handleLogout()">Logout</button>
      </div>
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
    loggedUserAvatarUrl() {
      return this.$store.state.profile.picture;
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
    justify-content space-between
    padding 20px

    &--left
      display flex
      justify-content flex-start

    &--right
      display flex
      justify-content flex-end

  &__item
    text-transform uppercase

    &--left
      border 0
      text-decoration none
      margin-right 10px

  &__image-aspect
    width 40px
    height 40px
    position relative
    margin 0 10px

  &__image-crop
    width 100%
    border-radius 100%
    height auto
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    overflow hidden
    text-align center
    display flex
    justify-content center
    cursor pointer

  &__image
    min-width 100%
    min-height 100%
    height auto
    margin 0 auto

</style>
