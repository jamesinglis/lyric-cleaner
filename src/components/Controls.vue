<template>
    <b-container fluid>
        <b-row>
            <b-col cols="5">Strip Chords</b-col>
            <b-col cols="1">
                <b-form-checkbox id="stripChords"
                                 v-model="stripChords"
                                 @change="pushControlFormToState"></b-form-checkbox>
            </b-col>
            <b-col cols="5">Merge Unlabeled Sections</b-col>
            <b-col cols="1">
                <b-form-checkbox id="mergeUnlabeledSections"
                                 v-model="mergeUnlabeledSections"
                                 @change="pushControlFormToState"></b-form-checkbox>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="5">Trim Lines</b-col>
            <b-col cols="1">
                <b-form-checkbox id="trimLines"
                                 v-model="trimLines"
                                 @change="pushControlFormToState"></b-form-checkbox>
            </b-col>
            <b-col cols="5">Label Unlabeled Sections</b-col>
            <b-col cols="1">
                <b-form-checkbox id="labelUnlabeledSections"
                                 v-model="labelUnlabeledSections"
                                 @change="pushControlFormToState"></b-form-checkbox>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="5">Condense Multiple Spaces</b-col>
            <b-col cols="1">
                <b-form-checkbox id="condenseMultipleSpaces"
                                 v-model="condenseMultipleSpaces"
                                 @change="pushControlFormToState"></b-form-checkbox>
            </b-col>
            <b-col cols="5">Straighten Quotes</b-col>
            <b-col cols="1">
                <b-form-checkbox id="straightenQuotes"
                                 v-model="straightenQuotes"
                                 @change="pushControlFormToState"></b-form-checkbox>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="5">Remove Hyphenated Words</b-col>
            <b-col cols="1">
                <b-form-checkbox id="removeHyphens"
                                 v-model="removeHyphens"
                                 @change="pushControlFormToState"></b-form-checkbox>
            </b-col>
            <b-col cols="5">Remove Text in Parenthesese</b-col>
            <b-col cols="1">
                <b-form-checkbox id="removeParentheses"
                                 v-model="removeParentheses"
                                 @change="pushControlFormToState"></b-form-checkbox>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="5">Remove Trailing Punctuation</b-col>
            <b-col cols="1">
                <b-form-checkbox id="removeTerminalPunctuation"
                                 v-model="removeTerminalPunctuation"
                                 @change="pushControlFormToState"></b-form-checkbox>
            </b-col>
            <b-col cols="5">Remove Multipliers</b-col>
            <b-col cols="1">
                <b-form-checkbox id="removeMultipliers"
                                 v-model="removeMultipliers"
                                 @change="pushControlFormToState"></b-form-checkbox>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="5">Remove Unnecessary Capitals</b-col>
            <b-col cols="1">
                <b-form-checkbox id="lowerCaseLine"
                                 v-model="lowerCaseLine"
                                 @change="pushControlFormToState"></b-form-checkbox>
            </b-col>
            <b-col cols="5">Suppress Duplicate Sections</b-col>
            <b-col cols="1">
                <b-form-checkbox id="suppressDuplicateSections"
                                 v-model="suppressDuplicateSections"
                                 @change="pushControlFormToState"></b-form-checkbox>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="5">Capitalize First Letter in Line</b-col>
            <b-col cols="1">
                <b-form-checkbox id="capitalizeFirstInLine"
                                 v-model="capitalizeFirstInLine"
                                 @change="pushControlFormToState"></b-form-checkbox>
            </b-col>
            <b-col cols="5">Capitalize All</b-col>
            <b-col cols="1">
                <b-form-checkbox id="capitalizeAll"
                                 v-model="capitalizeAll"
                                 @change="pushControlFormToState"></b-form-checkbox>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="5">Capitalize Proper Names</b-col>
            <b-col cols="1">
                <b-form-checkbox id="capitalizeNames"
                                 v-model="capitalizeNames"
                                 @change="pushControlFormToState"></b-form-checkbox>
            </b-col>
            <b-col cols="6">
                <b-form-select :value="capitalizeNamesPresetDefault"
                               :options="capitalizeNamesPresetOptions"
                               @change="selectCapitalizeNamesPreset"
                               v-show="capitalizeNames"
                ></b-form-select>
                <b-form-textarea id="capitalizeNamesValuesString" v-model="capitalizeNamesValuesString"
                                 @change.native="pushNamesValuesToState"
                                 :rows="3" :max-rows="6"
                                 v-show="capitalizeNames"
                ></b-form-textarea>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="5">Reflow Sections</b-col>
            <b-col cols="1">
                <b-form-checkbox id="reflowSections"
                                 v-model="reflowSections"
                                 @change="pushControlFormToState"></b-form-checkbox>
            </b-col>
            <b-col cols="6">
                <b-form-input id="reflowSectionsNumOfLines" v-model="reflowSectionsNumOfLines"
                              @change="pushControlFormToState"
                              v-show="reflowSections"
                ></b-form-input>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
  // import { mapGetters } from 'vuex'
  import Vue from 'vue'

  export default {
    name: 'lc-controls',
    data () {
      let stateValues = Object.assign({}, this.$store.state.uicontrol)
      return {
        stripChords: stateValues.stripChords,
        mergeUnlabeledSections: stateValues.mergeUnlabeledSections,
        labelUnlabeledSections: stateValues.labelUnlabeledSections,
        trimLines: stateValues.trimLines,
        condenseMultipleSpaces: stateValues.condenseMultipleSpaces,
        straightenQuotes: stateValues.straightenQuotes,
        removeHyphens: stateValues.removeHyphens,
        removeParentheses: stateValues.removeParentheses,
        removeTerminalPunctuation: stateValues.removeTerminalPunctuation,
        removeMultipliers: stateValues.removeMultipliers,
        lowerCaseLine: stateValues.lowerCaseLine,
        capitalizeFirstInLine: stateValues.capitalizeFirstInLine,
        capitalizeNames: stateValues.capitalizeNames,
        capitalizeNamesPresets: stateValues.capitalizeNamesPresets,
        capitalizeNamesPresetDefault: stateValues.capitalizeNamesPresetDefault,
        capitalizeNamesValues: stateValues.capitalizeNamesValues,
        capitalizeNamesValuesString: stateValues.capitalizeNamesValuesString,
        suppressDuplicateSections: stateValues.suppressDuplicateSections,
        capitalizeAll: stateValues.capitalizeAll,
        reflowSections: stateValues.reflowSections,
        reflowSectionsNumOfLines: stateValues.reflowSectionsNumOfLines,
      }
    },
    computed: {
      capitalizeNamesPresetOptions () {
        let presetOptions = []
        for (let preset in this.capitalizeNamesPresets) {
          presetOptions.push({value: preset, text: this.capitalizeNamesPresets[preset]['label']})
        }
        return presetOptions
      },
      controlForm () {
        return {
          stripChords: this.stripChords,
          mergeUnlabeledSections: this.mergeUnlabeledSections,
          labelUnlabeledSections: this.labelUnlabeledSections,
          trimLines: this.trimLines,
          condenseMultipleSpaces: this.condenseMultipleSpaces,
          straightenQuotes: this.straightenQuotes,
          removeHyphens: this.removeHyphens,
          removeParentheses: this.removeParentheses,
          removeTerminalPunctuation: this.removeTerminalPunctuation,
          removeMultipliers: this.removeMultipliers,
          lowerCaseLine: this.lowerCaseLine,
          capitalizeFirstInLine: this.capitalizeFirstInLine,
          capitalizeNames: this.capitalizeNames,
          capitalizeNamesPresets: this.capitalizeNamesPresets,
          capitalizeNamesPresetDefault: this.capitalizeNamesPresetDefault,
          capitalizeNamesValues: this.capitalizeNamesValues,
          capitalizeNamesValuesString: this.capitalizeNamesValuesString,
          suppressDuplicateSections: this.suppressDuplicateSections,
          capitalizeAll: this.capitalizeAll,
          reflowSections: this.reflowSections,
          reflowSectionsNumOfLines: this.reflowSectionsNumOfLines,
        }
      },
    },
    methods: {
      selectCapitalizeNamesPreset (value) {
        this.capitalizeNamesPresetDefault = value
        this.capitalizeNamesValuesString = this.capitalizeNamesPresets[value]['options'].join(',')
        this.capitalizeNamesValues = this.capitalizeNamesPresets[value]['options']
        this.$store.dispatch('uicontrol/pushControlsToStore', this.controlForm)
      },
      pushControlFormToState (value) {
        let context = this
        Vue.nextTick(function () {
          context.$store.dispatch('uicontrol/pushControlsToStore', context.controlForm)
        })
      },
      pushNamesValuesToState ($event) {
        let value = $event.target.value
        this.capitalizeNamesValuesString = value.replace(/[.;]/g, ',')
        this.capitalizeNamesValues = this.capitalizeNamesValuesString.split(',')
        this.$store.dispatch('uicontrol/pushControlsToStore', this.controlForm)
      },
    },
    mounted () {
      if (this.capitalizeNamesPresetDefault !== null) {
        this.capitalizeNamesValuesString = this.capitalizeNamesPresets[this.capitalizeNamesPresetDefault]['options'].join(
          ',')
        this.capitalizeNamesValues = this.capitalizeNamesPresets[this.capitalizeNamesPresetDefault]['options']
        this.$store.dispatch('uicontrol/pushControlsToStore', this.controlForm)
      }
    },
  }
</script>
