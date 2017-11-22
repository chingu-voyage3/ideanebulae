/* eslint no-param-reassign:
["error", { "props": true, "ignorePropertyModificationsFor": ["state"] }]
*/
import * as types from '../module-types';

// Actions
const actions = {
  SET_PROFILE_DATA({ commit }, profile) {
    commit(types.SET_PROFILE_DATA, profile);
  },
};

// Mutations
const mutations = {
  [types.SET_PROFILE_DATA](state, profile) {
    const { sub, nickname, name, picture } = profile;
    state.sub = sub;
    state.nickname = nickname;
    state.name = name;
    state.picture = picture;
  },
};

// Initial state
const state = {
  sub: '',
  nickname: '',
  name: '',
  picture: '',
};

export default {
  state,
  actions,
  mutations,
};
