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
        </b-row>
        <b-row>
            <b-col cols="5">Capitalize First Letter in Line</b-col>
            <b-col cols="1">
                <b-form-checkbox id="capitalizeFirstInLine"
                                 v-model="capitalizeFirstInLine"
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
                <b-form-input :value="capitalizeNamesValuesString"
                              @change="pushNamesValuesToState"></b-form-input>
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
      return {
        stripChords: this.$store.state.uicontrol.stripChords,
        mergeUnlabeledSections: this.$store.state.uicontrol.mergeUnlabeledSections,
        labelUnlabeledSections: this.$store.state.uicontrol.labelUnlabeledSections,
        trimLines: this.$store.state.uicontrol.trimLines,
        condenseMultipleSpaces: this.$store.state.uicontrol.condenseMultipleSpaces,
        straightenQuotes: this.$store.state.uicontrol.straightenQuotes,
        removeHyphens: this.$store.state.uicontrol.removeHyphens,
        removeParentheses: this.$store.state.uicontrol.removeParentheses,
        removeTerminalPunctuation: this.$store.state.uicontrol.removeTerminalPunctuation,
        removeMultipliers: this.$store.state.uicontrol.removeMultipliers,
        lowerCaseLine: this.$store.state.uicontrol.lowerCaseLine,
        capitalizeFirstInLine: this.$store.state.uicontrol.capitalizeFirstInLine,
        capitalizeNames: this.$store.state.uicontrol.capitalizeNames,
        capitalizeNamesValues: this.$store.state.uicontrol.capitalizeNamesValues,
        capitalizeNamesValuesString: this.$store.state.uicontrol.capitalizeNamesValues.join(','),
      }
    },
    computed: {
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
          capitalizeNamesValues: this.capitalizeNamesValues,
        }
      },
    },
    methods: {
      pushControlFormToState ($event) {
        let context = this
        Vue.nextTick(function () {
          context.$store.dispatch('uicontrol/pushControlsToStore', context.controlForm)
        })
      },
      pushNamesValuesToState (value) {
        this.capitalizeNamesValuesString = value.replace(/[.;]/g, ',')
        this.capitalizeNamesValues = this.capitalizeNamesValuesString.split(',')
        this.$store.dispatch('uicontrol/pushControlsToStore', this.controlForm)
      },
    },
  }
</script>
