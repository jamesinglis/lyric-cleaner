import * as types from '../mutation-types'

// state
export const state = {}

// getters
export const getters = {}

// mutations
export const mutations = {
  [types.PUSH_UI_CONTROLS_TO_STORE] (state, searchResults) {
    // state.searchResults = Object.assign({}, searchResults)
  },
}

// actions
export const actions = {
  pushSearchResults ({commit}, payload) {
    commit(types.PUSH_UI_CONTROLS_TO_STORE, payload)
  },
}
