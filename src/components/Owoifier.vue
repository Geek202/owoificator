<template>
    <input v-model="message" type="text" placeholder="Enter text to owo">
    <h3>Owoed text:</h3>
    <p>Low: {{ owoedText }}<br>
    Moderate: {{ owoedText }}<br>
    High: {{ veryOwoedText }}<br>
    Extweme: {{ extremeOwoedText }}</p>
    <h3>UwUed text:</h3>
    <p>Low: {{ uwuedText }}
    </p>
</template>

<script>
import {defineComponent, reactive} from 'vue';
import { translate as owoify } from '@zuzak/owo';
import { default as owo2 } from 'owoify-js';
import Uwuifier from 'uwuify';

export default defineComponent({
  data() {
    return {
      message: '',
    }
  },

  computed: {
      owoedText() {
          return owoify(this.message)
      },
      owoedText() {
          return owo2(this.message)
      },
      veryOwoedText() {
          return owo2(this.message, 'uwu')
      },
      extremeOwoedText() {
          return owo2(this.message, 'uvu')
      },
      uwuedText() {
          return new Uwuifier().uwuify(this.message)
      }
  }
});

</script>
