import { h, app, text } from "/modules/js/hyperapp.js";
import { Http } from "/modules/js/Http.js";
import { Header } from "/components/header";
import "/layouts/index.css";
import "./index.css";
// import lazyLoadInit from "./lazyload-init";

// make browser compatibility branch ? check work in modern browsers.
const format = "webp";

const getIndexes = Http({
  url: "/data/images-indexes.json",
  response: "json",
  action: (state, res) => {
    pureState.indexes = res;
    return {
      ...state,
      indexes: shuffle(res) || [],
    };
  },
});

const isFormat = (name) => {
  return format == getExtension(name);
};

const getExtension = (file) => {
  return file.split(".").pop();
};

const pureState = {
  indexes: [],
};

const initIndexes = getIndexes;
const initialState = [pureState, initIndexes];

const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

app({
  init: initialState,
  view: ({ indexes }) =>
    h("div", { class: "container" }, [
      Header(),
      h("main", {}, [
        h(
          "div",
          { class: "content indexes" },
          indexes &&
            indexes.map(
              (s) =>
                isFormat(s.name) &&
                h("div", { class: "imgc" }, [
                  h("img", {
                    alt: s.name,
                    src: `/data/images/${s.name}`,
                    loading: "lazy",
                    "data-src": `${s.name}`,
                  }),
                  h("div", { class: "imgc-label" }, text(s.name)),
                ])
            )
        ),
      ]),
    ]),
  subscriptions: () => {},
  node: document.getElementById("app"),
});

// lazyLoadInit();
