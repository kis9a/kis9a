import { app, h, text } from "../lib/hyperapp.js";
import { Http } from "../lib/hyperapp-fx/fx/Http.js";
import snarkdown from "../lib/snarkdown.js";

const getJson = Http({
  url: "./data/memos-indexes.json",
  response: "json",
  action: (state, content) => {
    initialState[0].indexes = content;
    return {
      ...state,
      indexes: content || [],
    };
  },
});

const getContent = (state, event) => [
  state,
  Http({
    url: `./memos/${event.target.innerHTML}`,
    response: "text",
    action: (state, content) => {
      return { ...state, ...{ content: content } };
    },
  }),
];

const setInputValue = (state, event) => {
  const str = event.target.value;
  const indexes = onSearchIndex(state, str);
  return { ...state, inputValue: str, indexes: indexes };
};

const onSearchIndex = (state, str) => {
  if (!str) state.indexes = initialState[0].indexes;
  const indexes = initialState[0].indexes.filter((e) =>
    ~e.name.indexOf(str) ? true : false
  );
  return indexes;
};

const toggleShowIndex = (state) => {
  return { ...state, showIndexes: !state.showIndexes };
};

const topsvg =
  '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"></path></svg>';

const Top = (state) => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  return state;
};

const state = {
  indexes: "",
  content: "",
  inputValue: "",
  showIndexes: true,
};

const initialState = [state, getJson];

app({
  init: initialState,
  view: ({ indexes, content, inputValue, showIndexes }) =>
    h("main", { class: "main" }, [
      h("header", { class: "header" }, [
        h("span", { class: "home" }, text("kis9a/memos")),
      ]),
      h("div", { class: "container" }, [
        h("div", { class: "inputs" }, [
          h("div", {
            class: "index-toggle-button",
            onclick: toggleShowIndex,
            innerHTML: `${showIndexes ? "&#9660" : "&#9650"}`,
          }),
          h("input", {
            type: "text",
            value: inputValue,
            oninput: setInputValue,
            class: "index-search",
          }),
        ]),
        h(
          "div",
          { class: `indexes  ${showIndexes ? "showIndexes" : "hide"}` },
          indexes &&
            indexes.map((index) =>
              h(
                "span",
                { class: "index", onclick: getContent },
                text(index.name)
              )
            )
        ),
        h("div", {
          class: `content ${content ? "" : "hide"}`,
          innerHTML: snarkdown(content),
        }),
        h("div", { class: "top", innerHTML: topsvg, onclick: Top }),
      ]),
    ]),
  node: document.getElementById("app"),
});
