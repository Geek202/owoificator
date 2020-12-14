import './App.css.proxy.js';
import {defineComponent, reactive} from "../web_modules/vue.js";
import FooTsxVue from "./components/FooTsx.js";
import FooTsx2 from "./components/Foo.js";
import BarJsxVue from "./components/BarJsx.js";
import BarJsx2 from "./components/Bar.js";
import Owoifier2 from "./components/Owoifier.js";
const defaultExport = defineComponent({
  components: {
    FooTsxVue,
    FooTsx: FooTsx2,
    BarJsxVue,
    BarJsx: BarJsx2,
    Owoifier: Owoifier2
  },
  setup() {
    const state = reactive({
      message: "Learn Vue"
    });
    return {
      state
    };
  }
});
import { createVNode as _createVNode, resolveComponent as _resolveComponent, openBlock as _openBlock, createBlock as _createBlock } from "../web_modules/vue.js"

const _hoisted_1 = { class: "App" }
const _hoisted_2 = { class: "App-header" }
const _hoisted_3 = /*#__PURE__*/_createVNode("h1", null, "Owoify", -1)

export function render(_ctx, _cache) {
  const _component_Owoifier = _resolveComponent("Owoifier")

  return (_openBlock(), _createBlock("div", _hoisted_1, [
    _createVNode("header", _hoisted_2, [
      _hoisted_3,
      _createVNode(_component_Owoifier)
    ])
  ]))
}

defaultExport.render = render
export default defaultExport