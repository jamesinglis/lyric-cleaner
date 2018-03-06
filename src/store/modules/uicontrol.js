import * as types from '../mutation-types'

// state
export const state = {
  stripChords: true,
  trimLines: true,
  condenseMultipleSpaces: true,
  removeHyphens: true,
  removeTerminalPunctuation: true,
  lowerCaseLine: true,
  capitalizeFirstInLine: true,
  capitalizeNames: true,
  // capitalizeNamesValues: ['God', 'Jesus'],
  capitalizeNamesValues: ['Du', 'Ditt', 'Din', 'Deg', 'Han', 'Ham', 'Herre', 'Gud', 'Far', 'Frelser', 'Jesus', 'Ånd', 'Kristus'],
}

// getters
export const getters = {
  stripChords: state => state.stripChords,
  trimLines: state => state.trimLines,
  condenseMultipleSpaces: state => state.condenseMultipleSpaces,
  removeHyphens: state => state.removeHyphens,
  removeTerminalPunctuation: state => state.removeTerminalPunctuation,
  lowerCaseLine: state => state.lowerCaseLine,
  capitalizeFirstInLine: state => state.capitalizeFirstInLine,
  capitalizeNames: state => state.capitalizeNames,
}

// mutations
export const mutations = {
  [types.PUSH_UI_CONTROLS_TO_STORE] (state, controls) {
    let controlObject = Object.assign({}, controls)
    for (var key in controlObject) {
      if (controls.hasOwnProperty(key)) {
        state[key] = controlObject[key]
      }
    }
  },
}

// actions
export const actions = {
  pushControlsToStore ({commit}, payload) {
    commit(types.PUSH_UI_CONTROLS_TO_STORE, payload)
  },
}
