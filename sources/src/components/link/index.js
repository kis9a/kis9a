import { h, text } from "/modules/js/hyperapp.js";
import { routes } from "/modules/js/router.js";
import "./index.css";

export const Link = (name, opts = { as: "", active: true }) => {
  let item = routes.find((v) => v.name == name);
  if (!item) {
    item = { name: name, href: "#" };
  }
  return h(
    "a",
    { class: `link ${opts.active ? "" : "disable"}`, href: item.href },
    text(opts.as || item.name.toUpperCase())
  );
};

export const LinkIcon = (name, opts = { as: "", active: true }) => {
  let item = routes.find((v) => v.name == name);
  if (!item) {
    item = { name: name, href: "#", icon: "" };
  }
  return h(
    "a",
    {
      class: `link-icon ${opts.active ? "" : "disable"}`,
      href: item.href,
      innerHTML: item.icon,
    },
    [h("span", {}, [text(opts.as || item.name.toUpperCase())])]
  );
};
