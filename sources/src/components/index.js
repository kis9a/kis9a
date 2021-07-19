import { Header } from "/components/header";
import { h, text, app } from "/modules/js/hyperapp.js";
import { viewLink, viewLinkActive } from "/components/link/unit.js";
import { viewHeader } from "/components/header/unit.js";
import "/layouts/index.css";
import "./index.css";

const sides = [
  {
    name: "Header",
    views: [
      {
        name: "default",
        view: viewHeader,
      },
    ],
  },
  {
    name: "Link",
    views: [
      {
        name: "default",
        view: viewLink,
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
