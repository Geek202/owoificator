
export let code = "._foo-tsx_kh4bk_1 {\n    color: green;\n}";
let json = {"foo-tsx":"_foo-tsx_kh4bk_1"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}