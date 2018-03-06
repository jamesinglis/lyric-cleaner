<template>
    <div id="app">
        <h1>Lyric Cleaner</h1>

        <label>Source</label>
        <textarea v-model="source" rows="20"></textarea>
        <label>Output</label>
        <textarea :value="output" rows="20" disabled="true"></textarea>

    </div>
</template>

<script>
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
        source = this.stripChordPro(source)
        source = this.trimLines(source)
        source = this.condenseMultipleSpaces(source)
        source = this.condenseMultipleLineBreaks(source)
        source = this.removeHyphens(source)
        source = this.removeTerminalPunctuation(source)
        source = this.lowerCaseLine(source)
        source = this.capitalizeFirstInLine(source)
        source = this.capitalizeNames(source)
        let array = this.textToArray(source)
        return this.arrayToText(array)
      },
    },
    methods: {
      trimLines (text) {
        let regexString = '^[ \t]*(.+?)[ \t]*$'
        let regex = new RegExp(regexString, 'gim')
        return text.replace(regex, '$1')
      },
      condenseMultipleSpaces (text) {
        let regexString = '[ \t]{1,}'
        let regex = new RegExp(regexString, 'gim')
        return text.replace(regex, ' ')
      },
      condenseMultipleLineBreaks (text) {
        let regexString = '\n{2,}'
        let regex = new RegExp(regexString, 'gim')
        return text.replace(regex, '\n\n')
      },
      lowerCaseLine (text) {
        let regexString = '^(.)(.*)$'
        let regex = new RegExp(regexString, 'gim')
        return text.replace(regex, (match, p1, p2, offset, string) => p1 + p2.toLowerCase())
      },
      upperCaseLine (text) {
        let regexString = '^(.*)$'
        let regex = new RegExp(regexString, 'gim')
        return text.replace(regex, (match, p1, offset, string) => p1.toUpperCase())
      },
      capitalizeFirstInLine (text) {
        let regexString = '^(.)'
        let regex = new RegExp(regexString, 'gim')
        return text.replace(regex, (match, p1, offset, string) => this.toTitleCase(p1))
      },
      removeHyphens (text) {
        let regexString = ' *\\- *'
        let regex = new RegExp(regexString, 'gim')
        return text.replace(regex, '')
      },
      removeTerminalPunctuation (text) {
        let regexString = '[,.;]+$'
        let regex = new RegExp(regexString, 'gim')
        return text.replace(regex, '')
      },
      stripChordPro (text) {
        let chordMatch = '[A-G](#|b|m|maj|sus)*\\d?'
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
      capitalizeNames (text) {
        let words = ['Du', 'Ditt', 'Din', 'Deg', 'Han', 'Ham', 'Herre', 'Gud', 'Jesus', 'Ånd']
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
            blockText = this.upperCaseLine(blockText)
            text += blockText
          }
        }

        return text.trim()
      },
    },
    components: {},
  }
</script>

<style>
    label {
        display: block;
    }

    textarea {
        width: 70%;
    }
</style>
