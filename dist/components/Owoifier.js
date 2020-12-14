
import {defineComponent, reactive} from '../../web_modules/vue.js';
import { translate as owoify } from '../../web_modules/@zuzak/owo.js';
import { default as owo2 } from '../../web_modules/owoify-js.js';

const defaultExport = defineComponent({
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


import { vModelText as _vModelText, createVNode as _createVNode, withDirectives as _withDirectives, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, Fragment as _Fragment, openBlock as _openBlock, createBlock as _createBlock } from "../../web_modules/vue.js"

const _hoisted_1 = /*#__PURE__*/_createVNode("h3", null, "Owoed text:", -1)
const _hoisted_2 = /*#__PURE__*/_createVNode("br", null, null, -1)
const _hoisted_3 = /*#__PURE__*/_createVNode("br", null, null, -1)
const _hoisted_4 = /*#__PURE__*/_createVNode("br", null, null, -1)

export function render(_ctx, _cache) {
  return (_openBlock(), _createBlock(_Fragment, null, [
    _withDirectives(_createVNode("input", {
      "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => (_ctx.message = $event)),
      type: "text",
      placeholder: "Enter text to owo"
    }, null, 512), [
      [_vModelText, _ctx.message]
    ]),
    _hoisted_1,
    _createVNode("p", null, [
      _createTextVNode("Low: " + _toDisplayString(_ctx.owoedText), 1),
      _hoisted_2,
      _createTextVNode(" Moderate: " + _toDisplayString(_ctx.uwuedText), 1),
      _hoisted_3,
      _createTextVNode(" High: " + _toDisplayString(_ctx.veryUwuedText), 1),
      _hoisted_4,
      _createTextVNode(" Extweme: " + _toDisplayString(_ctx.extremeUwuedText), 1)
    ])
  ], 64))
}

defaultExport.render = render
export default defaultExport