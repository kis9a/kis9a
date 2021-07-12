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
  svg_dot_horizon,
  svg_pencil_alt,
  svg_cube,
  svg_template,
  svg_external_link,
  svg_link,
  svg_calendar,
} from "./index.js";

export const viewIcons = () => {
  const icons = [
    svg_top,
    svg_close,
    svg_clear,
    svg_share,
    svg_raw,
    svg_memo,
    svg_home,
    svg_photo,
    svg_dot_vercel,
    svg_chart_bar,
    svg_calendar,
    svg_pencil_alt,
    svg_cube,
    svg_template,
    svg_external_link,
    svg_link,
    svg_dot_horizon,
  ];
  return h(
    "div",
    { class: "svg" },
    icons.map((v) => h("div", { innerHTML: v }))
  );
};
