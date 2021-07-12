import { h, text } from "/modules/js/hyperapp.js";
import { routes } from "/modules/js/router.js";
import { LinkIcon } from "/components/link";
import { svg_dot_horizon } from "/components/icons";
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
        h("h1", { class: "logo-text", onclick: toNavigation }, text("KIS9A")),
        h("div", { class: "logo-image" }, [
          h("img", {
            src: "/assets/logo.png",
            alt: "kis9a.png",
            onclick: toNavigation,
          }),
        ]),
        h(
          "div",
          {
            class: "menu-icon link-icon",
            innerHTML: svg_dot_horizon,
            onclick: toggleViewLinks,
          },
          text("menu")
        ),
        h(
          "div",
          { class: `links ${window.innerWidth < 600 ? "none" : ""}` },
          routes.map((r) => LinkIcon(r.name, { active: r.name !== c.name }))
        ),
      ]),
    ]),
  ]);
};

const toNavigation = (state) => {
  window.open("https://nav.kis9a.com", "_blank");
  return { ...state };
};

const toggleViewLinks = (state) => {
  const links = document.getElementsByClassName("links");
  links[0].classList.toggle("none");
  return { ...state };
};
