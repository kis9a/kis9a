import { h, text } from "/modules/js/hyperapp.js";
import { routes } from "/modules/js/router.js";
import "./index.css";

export const Link = (name, opts = { as: "", active: true }) => {
  const item = routes.find((v) => v.name == name);
  return h(
    "a",
    { class: `link ${opts.active ? "" : "disable"}`, href: item.href },
    text(opts.as || item.name.toUpperCase())
  );
};
