import { Fragment } from '../../web_modules/vue.js';
import {createVNode, isVNode} from '../../web_modules/vue.js';
const slice = Array.prototype.slice;
export function jsx(tag, props = null, children = null) {
  if (arguments.length > 3 || isVNode(children)) {
    children = slice.call(arguments, 2);
  }
  return createVNode(tag, props, children);
}

import {defineComponent, reactive} from "../../web_modules/vue.js";
import styles from "./Bar.module.css.proxy.js";
export default defineComponent({
  name: "BarJsx",
  setup() {
    const state = reactive({
      name: "BarJsx"
    });
    return () => /* @__PURE__ */ jsx(Fragment, null, /* @__PURE__ */ jsx("div", {
      className: styles["bar-jsx"]
    }, state.name));
  }
});