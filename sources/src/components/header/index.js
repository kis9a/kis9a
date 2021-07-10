import { h, text } from "/modules/js/hyperapp.js";
import { routes } from "/modules/js/router.js";
import { Link } from "/components/link";
import "./index.css";

var path = require("./path.js");

export const Header = () => {
  const uri = window.location.pathname + window.location.search;
  const ss = uri.split("/");
  let sn = "/";
  if (ss) {
    ss.forEach((v) => {
      if (v !== "") {
        sn = v;
        return;
      }
    });
  }
  const parse = (str) => {
    str = path.normalize(str);
    return str.replaceAll("/", "");
  };
  let c = routes.find((v) => {
    return parse(sn) === parse(v.href);
  });
  if (!c) {
    c = { name: "" };
  }
  return h("div", { class: "header-wrapper" }, [
    h("header", {}, [
      h("nav", {}, [
        h("h1", { class: "logo" }, text("KIS9A")),
        h(
          "div",
          { class: "links" },
          routes.map((r) => Link(r.name, { active: r.name !== c.name }))
        ),
      ]),
    ]),
  ]);
};
