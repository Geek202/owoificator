
export let code = "._bar-jsx_1ih6s_1 {\n  color: red;\n}\n";
let json = {"bar-jsx":"_bar-jsx_1ih6s_1"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}