import Vue from 'vue';
import Vuex from 'vuex';

import counter from './modules/counter';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    counter,
  },
});

export default store;
