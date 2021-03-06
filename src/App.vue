<template>
    <div id="app">
        <b-navbar toggleable="md" type="dark" variant="dark">
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
            <b-navbar-brand href="#">Lyric Cleaner</b-navbar-brand>

            <b-collapse is-nav id="nav_collapse">
                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-btn v-b-modal.controls variant="danger">Controls</b-btn>
                </b-navbar-nav>

            </b-collapse>
        </b-navbar>

        <b-container class="bv-row">
            <b-row>
                <b-col>
                    <label>Source: </label>
                    <textarea v-model="source" rows="24"></textarea>
                </b-col>
                <b-col>
                    <label>Output: {{ title }}</label>
                    <textarea :value="outputDisplay" rows="24" readonly></textarea>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-button @click="downloadFile">Download File</b-button>
                </b-col>
            </b-row>
            <b-row v-if="debug">
                <b-col>
                    <label>Debug</label>
                    <textarea :value="outputDebug" rows="12" disabled="true"></textarea>
                </b-col>
            </b-row>
        </b-container>

        <l-c-footer></l-c-footer>

        <b-modal id="controls" ref="controls" size="lg" hide-footer centered title="Controls">
            <l-c-controls></l-c-controls>
            <b-btn class="mt-3" variant="primary" block @click="hideControls">Close</b-btn>
        </b-modal>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import defaultText from '@/assets/text/default.txt'
  import LCControls from '@/components/Controls'
  import LCFooter from '@/components/Footer'

  export default {
    name: 'App',
    data () {
      return {
        source: defaultText,
        debug: false,
      }
    },
    computed: {
      title () {
        let text = this.sourceProcess(this.source)
        return this.extractSongTitle(text)
      },
      output () {
        let text = this.sourceProcess(this.source)
        text = this.removeSongTitle(text)
        return this.textToArray(text)
      },
      outputDisplay () {
        return this.arrayToText(this.output)
      },
      outputDebug () {
        return JSON.stringify(this.output)
      },
      ...mapGetters('uicontrol', [
        'stripChords',
        'trimLines',
        'condenseMultipleSpaces',
        'straightenQuotes',
        'removeHyphens',
        'removeParentheses',
        'removeTerminalPunctuation',
        'removeMultipliers',
        'lowerCaseLine',
        'songSectionsRegex',
        'capitalizeFirstInLine',
        'capitalizeNames',
        'capitalizeNamesValues',
      ]),
    },
    methods: {
      sourceProcess () {
        let source = this.source

        if (this.condenseMultipleSpaces) {
          source = this.condenseMultipleSpacesAction(source)
        }
        // Run this the first time
        if (this.trimLines) {
          source = this.trimLinesAction(source)
        }

        // Run removal filters first
        if (this.stripChords) {
          source = this.stripChordProAction(source)
        }
        if (this.removeHyphens) {
          source = this.removeHyphensAction(source)
        }
        if (this.removeParentheses) {
          source = this.removeParenthesesAction(source)
        }
        if (this.removeMultipliers) {
          source = this.removeMultipliersAction(source)
        }
        if (this.removeTerminalPunctuation) {
          source = this.removeTerminalPunctuationAction(source)
        }

        // Run a second time in case removal filters left artifacts
        if (this.trimLines) {
          source = this.trimLinesAction(source)
        }
        if (this.condenseMultipleSpaces) {
          source = this.condenseMultipleSpacesAction(source)
        }

        if (this.checkForSectionHeadings(source)) {
          source = this.condenseMultipleLineBreaksAction(source)
        }

        // Run the mutation filters
        if (this.straightenQuotes) {
          source = this.straightenQuotesAction(source)
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

        return source
      },
      trimLinesAction (text) {
        let regexString = '^[ \t]*(.*?)[ \t]*$'
        let regex = new RegExp(regexString, 'gim')
        return text.replace(regex, '$1').trim()
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
      checkForSectionHeadings (text) {
        // let songSections = ['Verse ?\\d?', 'Chorus ?\\d?', 'Bridge ?\\d?', 'Pre\\-?Chorus ?\\d?', 'Tag ?\\d?']
        let regexString = '^(' + this.songSectionsRegex.join('|') + ')$'
        let regex = new RegExp(regexString, 'gim')
        return regex.test(text)
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
        let regexString = '^([\'"\u2018\u2019\u201C\u201D]?)([A-Za-z])' // respects leading single and double quotes
        let regex = new RegExp(regexString, 'gim')
        return text.replace(regex, (match, p1, p2, offset, string) => p1 + this.toTitleCase(p2))
      },
      straightenQuotesAction (text) {
        return text.replace(/[\u2018\u2019]/g, '\'').replace(/[\u201C\u201D]/g, '"')
      },
      removeParenthesesAction (text) {
        let regexString = ' *\\(.*?\\) *'
        let regex = new RegExp(regexString, 'gim')
        return text.replace(regex, '')
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
      removeMultipliersAction (text) {
        let regexString = ' ?x\\d'
        let regex = new RegExp(regexString, 'gim')
        return text.replace(regex, '')
      },
      stripChordProAction (text) {
        let chordMatch = '[A-G](#|b|m|maj|sus)*\\d?(\\/[A-G](#|b)*)?'
        let regexString = '^((' + chordMatch + ')| )+$'
        let regex = new RegExp(regexString, 'gm')
        text = text.replace(regex, ' %% ')

        regexString = '\\[' + chordMatch + '\\]'
        regex = new RegExp(regexString, 'gm')
        text = text.replace(regex, '%%')

        regexString = '^( |%%)+$\\n'
        regex = new RegExp(regexString, 'gm')
        text = text.replace(regex, '%% ')

        regexString = '%% ?'
        regex = new RegExp(regexString, 'gm')
        return text.replace(regex, '')
      },
      extractSongTitle (text) {
        let firstLine = text.split('\n')[0]
        let regexString = '^(Title: )?(.*)$'
        let regex = new RegExp(regexString, 'gm')

        if (this.checkForSectionHeadings(firstLine) === false && firstLine.trim().length > 0) {
          return firstLine.replace(regex, '$2')
        }
        return 'Title Unknown'
      },
      removeSongTitle (text) {
        let lines = text.split('\n')
        let firstLine = lines[0]
        let remainingLines = text.split('\n').splice(1)
        let regexString = '^(Title: )?(.*)$'
        let regex = new RegExp(regexString, 'gm')

        if (this.checkForSectionHeadings(firstLine) === false &&
          firstLine.trim().length > 0 &&
          lines[1].trim().length === 0) {
          firstLine = firstLine.replace(regex, '')
        }
        return [firstLine].concat(remainingLines).join('\n')
      },
      capitalizeNamesAction (text) {
        let words = this.$store.state.uicontrol.capitalizeNamesValues
        let regexString = '(^|[ ,.;!?\'"\u2018\u2019\u201C\u201D])(' + words.join('|') +
          ')([ ,.;!?\'"\u2018\u2019\u201C\u201D]|$)'
        let regex = new RegExp(regexString, 'gim')
        return text.replace(regex, (match, p1, p2, p3, offset, string) => p1 + this.toTitleCase(p2) + p3)
      },
      toTitleCase (text) {
        return text.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
      },
      forceTitleCase (text) {
        return this.toTitleCase(text.toLowerCase())
      },
      reflowSectionsAction (text, reflowSectionsNumOfLines) {
        let outputText = ''
        let lines = text.trim().split('\n')
        let index
        let divisor = 1

        while (divisor < 250) {
          if (Math.ceil(lines.length / divisor) <= reflowSectionsNumOfLines) {
            for (index in lines) {
              outputText += lines[index] + '\n'
              if (index % Math.ceil(lines.length / divisor) === (reflowSectionsNumOfLines - 1)) {
                outputText += '\n'
              }
            }
            break
          } else {
            divisor++
          }
        }

        return outputText.trim()
      },
      textToArray (text) {
        let blockArray = text.split('\n\n')
        let outputArray = []
        let outputArrayTemp = []
        // let songSections = ['Verse ?\\d?', 'Chorus ?\\d?', 'Bridge ?\\d?', 'Pre-Chorus ?\\d?', 'Tag ?\\d?']
        let regexString = '^(' + this.songSectionsRegex.join('|') + ')$'
        let regex = new RegExp(regexString, 'i')
        let i = 0
        let counter = 1

        for (var block of blockArray) {
          if (block === '') continue
          let blockSplit = block.split('\n')
          let blockObject = {label: '', lines: []}

          if (regex.test(blockSplit[0])) {
            blockObject.label = this.forceTitleCase(blockSplit.shift())
          } else if (this.$store.state.uicontrol.labelUnlabeledSections) {
            blockObject.label = 'Verse ' + counter++
          }

          blockObject.lines = blockSplit.splice(0)
          outputArray.push(blockObject)
        }

        if (this.debug) {
          console.log('textToArray Loop 1')
          console.log(outputArray)
        }

        blockArray = outputArray.slice(0)
        outputArray = []

        // This loop condenses down multiple "sections" into named sections
        if (blockArray.length > 0 && this.$store.state.uicontrol.mergeUnlabeledSections) {
          outputArray.push(blockArray[0])
          let lastArrayKey = 0

          for (i = 0; i < blockArray.length; i++) {
            if (i !== 0 && blockArray[i].label === '') {
              lastArrayKey = outputArray.length - 1
              outputArray[lastArrayKey].lines = blockArray[lastArrayKey].lines.concat(blockArray[i].lines)
            } else if (i !== 0) {
              outputArray.push(blockArray[i])
            }
          }

          blockArray = outputArray.slice(0)
          outputArray = []
        }

        if (this.debug) {
          console.log('textToArray Loop 2')
          console.log(outputArray)
        }

        // This loop checks there are no duplicate sections
        if (blockArray.length > 0 && this.$store.state.uicontrol.suppressDuplicateSections) {
          for (i = 0; i < blockArray.length; i++) {
            if (outputArrayTemp.indexOf(JSON.stringify(blockArray[i])) === -1) {
              outputArray.push(blockArray[i])
            }
            outputArrayTemp.push(JSON.stringify(blockArray[i]))
          }
        }

        if (this.debug) {
          console.log('textToArray Loop 3')
          console.log(outputArray)
        }

        return outputArray
      },
      arrayToText (array) {
        let text = ''
        let reflowSectionsNumOfLines = parseInt(this.$store.state.uicontrol.reflowSectionsNumOfLines)
        for (var block of array) {
          if (block.label !== '') {
            text += block.label + '\n'
          }
          if (typeof block.lines !== 'undefined') {
            let blockText = block.lines.join('\n')
            if (this.$store.state.uicontrol.capitalizeAll) {
              blockText = this.upperCaseLineAction(blockText)
            }

            if (this.$store.state.uicontrol.reflowSections && reflowSectionsNumOfLines > 0) {
              blockText = this.reflowSectionsAction(blockText, reflowSectionsNumOfLines)
            }
            text += blockText + '\n\n'
          }
        }

        return text.trim()
      },
      hideControls () {
        this.$refs.controls.hide()
      },
      downloadFile () {
        let element = document.createElement('a')
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.outputDisplay))
        element.setAttribute('download', this.title + '.txt')
        element.style.display = 'none'
        document.body.appendChild(element)
        element.click()
        document.body.removeChild(element)
      },
    },
    components: {
      LCControls,
      LCFooter,
    },
    created () {
      this.$ga.page('/')
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
