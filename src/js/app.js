import { app, h, text } from "../lib/hyperapp.js";
import { Http } from "../lib/hyperapp-fx/index.js";
import snarkdown from "../lib/snarkdown.js";

const getJson = async (target) => {
  try {
    const memosJson = await fetch(`./data/${target}.json`).then((response) =>
      response.text()
    );
    return JSON.parse(memosJson);
  } catch (e) {
    console.error(e);
  }
  return [];
};

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
  if (!str) state.indexes = initialState.indexes;
  const indexes = initialState.indexes.filter((e) =>
    ~e.name.indexOf(str) ? true : false
  );
  return indexes;
};

const toggleShowIndex = (state) => {
  return { ...state, show: !state.show };
};

const svgstr =
  '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"></path></svg>';

const Top = (state) => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  return state
}

const initialState = {
  indexes: await getJson("memos-indexes").then((r) => r),
  content: "",
  inputValue: "",
  show: true,
};

app({
  init: initialState,
  view: ({ indexes, content, inputValue, show }) =>
    h("div", { class: "main" }, [
      h("header", { class: "header" }, [
        h("span", { class: "home" }, text("kis9a/memos")),
      ]),
      h("div", { class: "container" }, [
        h("div", { class: "inputs" }, [
          h("div", {
            class: "index-toggle-button",
            onclick: toggleShowIndex,
            innerHTML: `${show ? "&#9660" : "&#9650"}`,
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
          { class: `indexes  ${show ? "show" : "hide"}` },
          indexes &&
            indexes.map((index) =>
              h(
                "span",
                { class: "index", onclick: getContent },
                text(index.name)
              )
            )
        ),
        h("div", { class: "content", innerHTML: snarkdown(content) }),
        h("div", { class: "top", innerHTML: svgstr, onclick: Top }),
      ]),
    ]),
  node: document.getElementById("app"),
});
