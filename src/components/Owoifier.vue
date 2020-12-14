<template>
    <input v-model="message" type="text" placeholder="Enter text to owo">
    <h3>Owoed text:</h3>
    <p>Low: {{ owoedText }}<br>
    Moderate: {{ uwuedText }}<br>
    High: {{ veryUwuedText }}<br>
    Extweme: {{ extremeUwuedText }}</p>
</template>

<script>
import {defineComponent, reactive} from 'vue';
import { translate as owoify } from '@zuzak/owo';
import { default as owo2 } from 'owoify-js';

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
      uwuedText() {
          return owo2(this.message)
      },
      veryUwuedText() {
          return owo2(this.message, 'uwu')
      },
      extremeUwuedText() {
          return owo2(this.message, 'uvu')
      }
  }
});

</script>
