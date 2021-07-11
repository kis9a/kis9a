import { h } from "/modules/js/hyperapp.js";
import {
  svg_top,
  svg_close,
  svg_clear,
  svg_share,
  svg_raw,
  svg_memo,
} from "./index.js";

export const viewIcons = () => {
  const icons = [svg_top, svg_close, svg_clear, svg_share, svg_raw, svg_memo];
  return h(
    "div",
    { class: "svg" },
    icons.map((v) => h("div", { innerHTML: v }))
  );
};
