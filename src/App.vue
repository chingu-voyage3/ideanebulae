<template>
  <div id="app">
    <main-navbar></main-navbar>
    <router-view></router-view>
    <main-footer></main-footer>
  </div>
</template>

<script>
import MainNavbar from './components/shared/MainNavbar';
import MainFooter from './components/shared/MainFooter';

export default {
  name: 'app',
  components: {
    MainNavbar,
    MainFooter,
  },
};
</script>

<style lang="stylus">

// global vars

@import "./style/global.styl";

// this isn't working -- it imports style declarations but not variables
// so for now i'm declaring vars in each component...
// there has to be a better way to do this but not sure how??

$dkblue = #3023AE
$purple = #7c48c2
$pink = #C86DD7

</style>
