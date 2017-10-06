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
// global app styles

// linear-gradient()
//   -webkit-linear-gradient arguments
//   -moz-linear-gradient arguments
//   -o-linear-gradient arguments
//   linear-gradient arguments

// linear-gradient(args...)
//    -webkit-linear-gradient args
//    -moz-linear-gradient args
//    -o-linear-gradient args
//    linear-gradient args

$dkblue = #3023AE
$purple = #7c48c2
$pink = #C86DD7

#app {
  font-family: 'Titillium Web', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $purple;
  letter-spacing: 1px;
  line-height: 1.5em;
}

.container
  width 100%
  max-width 1200px
  margin auto

.purple-gradient
  background $purple
  background linear-gradient(-134deg, $dkblue 0%, $pink 100%)

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


</style>
