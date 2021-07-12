import { h } from "/modules/js/hyperapp.js";
import {
  svg_top,
  svg_close,
  svg_clear,
  svg_share,
  svg_raw,
  svg_memo,
  svg_home,
  svg_photo,
  svg_chart_bar,
  svg_dot_vercel,
  svg_calendar
} from "./index.js";

export const viewIcons = () => {
  const icons = [svg_top, svg_close, svg_clear, svg_share, svg_raw, svg_memo, svg_home, svg_photo, svg_dot_vercel, svg_chart_bar, svg_calendar];
  return h(
    "div",
    { class: "svg" },
    icons.map((v) => h("div", { innerHTML: v }))
  );
};
