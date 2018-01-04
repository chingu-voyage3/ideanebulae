<template>
  <div id="app">
    <main-navbar></main-navbar>
    <router-view></router-view>
    <main-footer></main-footer>
  </div>
</template>

<script>
import http from '@/api';
import { getUserProfile, getAccessToken } from '@/auth';
import MainNavbar from './components/shared/MainNavbar';
import MainFooter from './components/shared/MainFooter';

export default {
  name: 'app',
  components: {
    MainNavbar,
    MainFooter,
  },

  mounted() {
    if (getAccessToken()) {
      getUserProfile()
        .then((profile) => {
          // Dispatch an action to set the current user profile data
          // to the payload we received
          this.$store.dispatch('SET_PROFILE_DATA', profile);
          http.put(`/profile/${profile.sub}`, {
            profile,
          })
          // eslint-disable-next-line no-unused-vars
          .then((res) => {
            // Profile successfully retrieved
          })
          .catch((err) => {
            throw new Error(`Error routing to user profile page: ${err}`);
          });
        })
        .catch((err) => {
          throw new Error(`Error retrieving user security profile: ${err}`);
        });
    }
  },
};
</script>

<style lang="stylus">
@import '~stylus_var'

// global styles

*, *::before, *::after {
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Titillium Web', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $gray_text;
  letter-spacing: 1px;
  line-height: 1.5em;
}

.container
  width 100%
  max-width 1200px
  padding-top 20px
  margin auto
  min-height calc(100vh - 150px) // combined height of nav + footer

.purple-gradient
  background $purple
  background linear-gradient(-134deg, $dkblue 0%, $pink 100%)

.blue-gradient
	background $medblue
	background linear-gradient(-134deg, $aqua 0%, $sky 100%)


.text-gradient
  -webkit-background-clip text
  -webkit-text-fill-color transparent


// visible to screenreader only
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0,0,0,0);
    border: 0;
}

// global button styles

.btn
  -webkit-appearance: none;
  appearance: none;
  border: none;
  background: transparent;
  color: inherit;
  cursor: pointer


  &:hover, &:active, &:focus
    -webkit-appearance: none;
    appearance: none;
    border: none;
    background: transparent;
    color: inherit;
    border-radius 40px !important


  &__primary
    text-align: center;
    font-family: inherit;
    font-weight: inherit;
    font-size: inherit;
    padding 9px 18px
    border 1px solid $purple
    border-radius 40px
    letter-spacing 1.5px
    color $purple
    position: relative;
    overflow: hidden;
    transition all 300ms ease-in-out


    &:hover, &:active
      background $purple
      background linear-gradient(-134deg, $dkblue 0%, $pink 100%)
      color white
      border 1px solid $purple
      transition all 300ms ease-in-out
      -webkit-box-shadow: 2px 2px 10px 0 rgba(110, 28, 233, 0.8);
      -moz-box-shadow: 2px 2px 10px 0 rgba(110, 28, 233, 0.8);
      box-shadow: 2px 2px 10px 0 rgba(110, 28, 233, 0.8);


    &:focus
      outline 0
      border 1px solid $purple
      -webkit-box-shadow: 0 0 6px 0 rgba(110, 28, 233, 0.8);
      -moz-box-shadow: 0 0 6px 0 rgba(110, 28, 233, 0.8);
      box-shadow: 0 0 6px 0 rgba(110, 28, 233, 0.8);


    &:after
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 5px;
      height: 5px;
      background: rgba(255, 255, 255, .3);
      opacity: 0;
      border-radius: 100%;
      transform: scale(1, 1) translate(-50%);
      transform-origin: 50% 50%;


    @keyframes ripple
      0%
        transform: scale(0, 0);
        opacity: 1;

      20%
        transform: scale(25, 25);
        opacity: 1;

      100%
        opacity: 0;
        transform: scale(40, 40);


    &:focus:not(:active)::after
      animation: ripple 1s ease-out;

</style>
