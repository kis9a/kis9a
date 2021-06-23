import { h, text, app } from "/modules/js/hyperapp.js";
import { Http } from "/modules/js/Http.js";
import { Header } from "/components/header";
import "/modules/css/mvp.css";
import "./index.css";

const getSvgs = Http({
  url: "/data/wakatime.json",
  response: "json",
  action: (state, svgs) => {
    return {
      ...state,
      svgs: svgs.svgs || [],
    };
  },
});

const state = {
  svgs: {},
};

const initSvgs = getSvgs;
const initialState = [state, initSvgs];

app({
  init: initialState,
  view: ({ svgs }) =>
    h("div", { class: "container" }, [
      Header(),
      h("main", {}, [
        h(
          "div",
          { class: "svgs" },
          svgs.map((s) =>
            h("div", { class: "item" }, [
              h("img", { src: s.activity }),
              h("img", { src: s.percent }),
              h("img", { src: s.bar }),
            ])
          )
        ),
      ]),
    ]),
  subscriptions: () => {},
  node: document.getElementById("app"),
});
