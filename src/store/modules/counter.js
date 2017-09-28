/* eslint no-param-reassign:
["error", { "props": true, "ignorePropertyModificationsFor": ["state"] }]
*/
import * as types from '../module-types';

// Actions
const actions = {
  INCREMENT_NUMBER_COUNT({ commit }) {
    commit(types.INCREMENT_COUNTER);
  },

  DECREMENT_NUMBER_COUNT({ commit }) {
    commit(types.DECREMENT_COUNTER);
  },
};

// Mutations
const mutations = {
  [types.INCREMENT_COUNTER](state) {
    state.number += 1;
  },

  [types.DECREMENT_COUNTER](state) {
    state.number -= 1;
  },
};

// Initial state
const state = {
  number: 0,
};

export default {
  state,
  actions,
  mutations,
};
