import { Header } from "/components/header";
import { h, text, app } from "/modules/js/hyperapp.js";
import { Link } from "/components/link";
import {
  svg_top,
  svg_close,
  svg_clear,
  svg_share,
  svg_raw,
  svg_memo,
} from "/components/icons";
import "/layouts/index.css";
import "./index.css";

const viewLinkDefault = () => {
  return Link("name");
};

const viewLinkActive = () => {
  return Link("name");
};

const viewIcons = () => {
  const icons = [svg_top, svg_close, svg_clear, svg_share, svg_raw, svg_memo];
  return h(
    "div",
    {},
    icons.map((v) => h("div", { innerHTML: v }))
  );
};

const sides = [
  {
    name: "Link",
    views: [
      {
        name: "default",
        view: viewLinkDefault,
      },
      {
        name: "active",
        view: viewLinkActive,
      },
    ],
  },
  {
    name: "Icons",
    views: [
      {
        name: "default",
        view: viewIcons,
      },
    ],
  },
];

const initialState = [
  {
    cview: h("div", {}, text("")),
  },
];

const setView = (state, views) => {
  const view = h(
    "div",
    {},
    views.map((v) => h("div", {}, h("div", {}, v.view())))
  );
  return { ...state, cview: view };
};

app({
  init: initialState,
  view: ({ cview }) =>
    h("div", { class: "container" }, [
      Header(),
      h("main", { class: "main" }, [
        h(
          "div",
          { class: "sidebar" },
          sides &&
            sides.map((v) =>
              h(
                "div",
                { class: "side", onclick: [setView, v.views] },
                text(v.name)
              )
            )
        ),
        h("div", { class: "content" }, h("h1", {}, cview)),
      ]),
    ]),
  subscriptions: () => {},
  node: document.getElementById("app"),
});
