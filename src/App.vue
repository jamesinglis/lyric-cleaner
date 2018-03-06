<template>
    <div id="app">
        <b-navbar toggleable="md" type="dark" variant="dark">
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
            <b-navbar-brand href="#">Lyric Cleaner</b-navbar-brand>

            <b-collapse is-nav id="nav_collapse">
                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-btn v-b-modal.controls>Controls</b-btn>
                </b-navbar-nav>

            </b-collapse>
        </b-navbar>

        <b-container class="bv-row">
            <b-row>
                <b-col>
                    <label>Source</label>
                    <textarea v-model="source" rows="32"></textarea>
                </b-col>
                <b-col>
                    <label>Output</label>
                    <textarea :value="output" rows="32" disabled="true"></textarea>
                </b-col>
            </b-row>
        </b-container>

        <l-c-footer></l-c-footer>

        <b-modal id="controls" size="lg" centered title="Controls">
            <l-c-controls></l-c-controls>
        </b-modal>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import LCControls from '@/components/Controls'
  import LCFooter from '@/components/Footer'

  export default {
    name: 'App',
    data () {
      return {
        source: '',
      }
    },
    computed: {
      output () {
        let source = this.source
        if (this.stripChords) {
          source = this.stripChordProAction(source)
        }
        if (this.trimLines) {
          source = this.trimLinesAction(source)
        }
        if (this.condenseMultipleSpaces) {
          source = this.condenseMultipleSpacesAction(source)
        }

        source = this.condenseMultipleLineBreaksAction(source)

        if (this.removeHyphens) {
          source = this.removeHyphensAction(source)
        }
        if (this.removeTerminalPunctuation) {
          source = this.removeTerminalPunctuationAction(source)
        }
        if (this.lowerCaseLine) {
          source = this.lowerCaseLineAction(source)
        }
        if (this.capitalizeFirstInLine) {
          source = this.capitalizeFirstInLineAction(source)
        }
        if (this.capitalizeNames) {
          source = this.capitalizeNamesAction(source)
        }
        let array = this.textToArray(source)
        return this.arrayToText(array)
      },
      ...mapGetters('uicontrol', [
        'stripChords',
        'trimLines',
        'condenseMultipleSpaces',
        'removeHyphens',
        'removeTerminalPunctuation',
        'lowerCaseLine',
        'capitalizeFirstInLine',
        'capitalizeNames',
        'capitalizeNamesValues',
      ]),
    },
    methods: {
      trimLinesAction (text) {
        let regexString = '^[ \t]*(.+?)[ \t]*$'
        let regex = new RegExp(regexString, 'gim')
        return text.replace(regex, '$1')
      },
      condenseMultipleSpacesAction (text) {
        let regexString = '[ \t]{1,}'
        let regex = new RegExp(regexString, 'gim')
        return text.replace(regex, ' ')
      },
      condenseMultipleLineBreaksAction (text) {
        let regexString = '\n{2,}'
        let regex = new RegExp(regexString, 'gim')
        return text.replace(regex, '\n\n')
      },
      lowerCaseLineAction (text) {
        let regexString = '^(.)(.*)$'
        let regex = new RegExp(regexString, 'gim')
        return text.replace(regex, (match, p1, p2, offset, string) => p1 + p2.toLowerCase())
      },
      upperCaseLineAction (text) {
        let regexString = '^(.*)$'
        let regex = new RegExp(regexString, 'gim')
        return text.replace(regex, (match, p1, offset, string) => p1.toUpperCase())
      },
      capitalizeFirstInLineAction (text) {
        let regexString = '^(.)'
        let regex = new RegExp(regexString, 'gim')
        return text.replace(regex, (match, p1, offset, string) => this.toTitleCase(p1))
      },
      removeHyphensAction (text) {
        let regexString = ' *\\- *'
        let regex = new RegExp(regexString, 'gim')
        return text.replace(regex, '')
      },
      removeTerminalPunctuationAction (text) {
        let regexString = '[,.;]+$'
        let regex = new RegExp(regexString, 'gim')
        return text.replace(regex, '')
      },
      stripChordProAction (text) {
        let chordMatch = '[A-G](#|b|m|maj|sus)*\\d?(\\/[A-G](#|b)*)?'
        let regexString = '(?<=(?:^|[ \t]))' + chordMatch + '(?=(?:[ \t]|$))'
        let regex = new RegExp(regexString, 'gim')
        text = text.replace(regex, '%%')

        regexString = '\\[' + chordMatch + '\\]'
        regex = new RegExp(regexString, 'gim')
        text = text.replace(regex, '%%')

        regexString = '^( |%%)+$\\n'
        regex = new RegExp(regexString, 'gim')
        text = text.replace(regex, '')

        regexString = '%% ?'
        regex = new RegExp(regexString, 'gim')
        return text.replace(regex, '')
      },
      capitalizeNamesAction (text) {
        // let words = ['Du', 'Ditt', 'Din', 'Deg', 'Han', 'Ham', 'Herre', 'Gud', 'Jesus', 'Ånd']
        let words = this.$store.state.uicontrol.capitalizeNamesValues
        let regexString = '(?<=(?:^|[ ,.;!?]))(' + words.join('|') + ')(?=(?:[ ,.;!?]|$))'
        // console.log(regexString)
        let regex = new RegExp(regexString, 'gim')
        return text.replace(regex, (match, p1, p2, p3, offset, string) => this.toTitleCase(p1))
      },
      toTitleCase (text) {
        return text.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
      },
      textToArray (text) {
        let blockArray = text.split('\n\n')
        let outputArray1 = []
        let outputArray2 = []
        let outputArray3 = []
        let outputArray3Temp = []
        let songSections = ['Verse ?\\d?', 'Chorus ?\\d?', 'Bridge ?\\d?', 'Pre-Chorus ?\\d?', 'Tag ?\\d?']
        let regexString = '^(' + songSections.join('|') + ')$'
        let regex = new RegExp(regexString, 'i')

        for (var block of blockArray) {
          if (block === '') continue
          let blockSplit = block.split('\n')
          let blockObject = {label: '', lines: []}

          if (regex.test(blockSplit[0])) {
            blockObject.label = blockSplit.shift()
          }

          blockObject.lines = blockSplit
          outputArray1.push(blockObject)
        }

        // This loop condenses down multiple "sections" into named sections
        if (outputArray1.length > 0) {
          outputArray2.push(outputArray1[0])
          let lastArrayKey = 0

          for (var i = 0; i < outputArray1.length; i++) {
            if (i !== 0 && outputArray1[i].label === '') {
              lastArrayKey = outputArray2.length - 1
              outputArray2[lastArrayKey].lines = outputArray2[lastArrayKey].lines.concat(outputArray1[i].lines)
            } else if (i !== 0) {
              outputArray2.push(outputArray1[i])
            }
          }
        }

        // This loop checks there are no duplicate sections
        if (outputArray2.length > 0) {
          for (i = 0; i < outputArray2.length; i++) {
            if (outputArray3Temp.indexOf(JSON.stringify(outputArray2[i])) === -1) {
              outputArray3.push(outputArray2[i])
            }
            outputArray3Temp.push(JSON.stringify(outputArray2[i]))
          }
        }

        return outputArray3
      },
      arrayToText (array) {
        let text = ''
        for (var block of array) {
          console.log(block)
          if (block.label !== '') {
            text += block.label + '\n'
          }
          if (typeof block.lines !== 'undefined') {
            let blockText = block.lines.join('\n') + '\n\n'
            // blockText = this.upperCaseLineAction(blockText)
            text += blockText
          }
        }

        return text.trim()
      },
    },
    components: {
      LCControls,
      LCFooter,
    },
  }
</script>

<style>
    .bv-row {
        padding: 1rem 0;
    }
    label {
        display: block;
        font-weight: bold;
        font-size: 120%;
    }

    textarea {
        width: 100%;
    }
</style>
