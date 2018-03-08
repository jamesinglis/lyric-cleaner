import * as types from '../mutation-types'

// state
export const state = {
  stripChords: true,
  removeHyphens: true,
  removeParentheses: true,
  removeMultipliers: true,
  removeTerminalPunctuation: true,
  mergeUnlabeledSections: false,
  labelUnlabeledSections: true,
  trimLines: true,
  condenseMultipleSpaces: true,
  straightenQuotes: true,
  lowerCaseLine: true,
  capitalizeFirstInLine: true,
  capitalizeNames: true,
  capitalizeNamesPresets: {
    en: {
      label: 'English',
      options: [
        'Your',
        'You',
        'He',
        'His',
        'Him',
        'Lord',
        'God',
        'Jesus',
        'Father',
        'Saviour',
        'Savior',
        'Spirit',
        'Christ',
        'I',
      ],
    },
    nb: {
      label: 'Norwegian',
      options: [
        'Du',
        'Ditt',
        'Din',
        'Deg',
        'Han',
        'Ham',
        'Herre',
        'Gud',
        'Far',
        'Frelser',
        'Jesus',
        'Ånd',
        'Kristus',
      ],
    },
  },
  capitalizeNamesPresetDefault: 'en',
  capitalizeNamesValues: [],
  capitalizeNamesValuesString: '',
  suppressDuplicateSections: true,
  capitalizeAll: false,
}

// getters
export const getters = {
  stripChords: state => state.stripChords,
  removeHyphens: state => state.removeHyphens,
  removeParentheses: state => state.removeParentheses,
  removeMultipliers: state => state.removeMultipliers,
  removeTerminalPunctuation: state => state.removeTerminalPunctuation,
  mergeUnlabeledSections: state => state.mergeUnlabeledSections,
  labelUnlabeledSections: state => state.labelUnlabeledSections,
  trimLines: state => state.trimLines,
  condenseMultipleSpaces: state => state.condenseMultipleSpaces,
  straightenQuotes: state => state.straightenQuotes,
  lowerCaseLine: state => state.lowerCaseLine,
  capitalizeFirstInLine: state => state.capitalizeFirstInLine,
  capitalizeNames: state => state.capitalizeNames,
  capitalizeNamesPresets: state => state.capitalizeNamesPresets,
  capitalizeNamesPresetDefault: state => state.capitalizeNamesPresetDefault,
  capitalizeNamesValues: state => state.capitalizeNamesValues,
  capitalizeNamesValuesString: state => state.capitalizeNamesValuesString,
  suppressDuplicateSections: state => state.capitalizeAll,
  capitalizeAll: state => state.capitalizeAll,
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
