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

// use when you need to wrap an interactive element in a <button> element to enable keypress behavior and WAI-ARIA roles but don't want default browser button styling

.aria-button {
  -webkit-appearance: none;
  appearance: none;
  border: none;
  background: transparent;
  color: inherit;

  &:hover, &:active, &:focus {
    -webkit-appearance: none;
    appearance: none;
    border: none;
    background: transparent;
    outline: none;
    color: inherit;
  }
  &__link {
    text-align: left;
    font-family: inherit;
    font-weight: inherit;
    font-size: inherit;
    width: 100%;
    padding-bottom: 5px;
    margin-bottom: 10px;

    &:hover, &:active {
      border-bottom: 1px dotted;
      cursor: pointer;

    }

  }
}


</style>
