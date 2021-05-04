import { app, h, text } from "../lib/hyperapp.js";
import { Http } from "../lib/hyperapp-fx/fx/Http.js";
import snarkdown from "../lib/snarkdown.js";

const getJson = Http({
  url: "./data/memos-indexes.json",
  response: "json",
  action: (state, indexes) => {
    initialState[0].indexes = indexes;
    return {
      ...state,
      indexes: indexes || [],
    };
  },
});

const getContent = (state, event) => {
  // TODO: reduce fetch
  const index = event.target.innerHTML;
  const exists = state.contents.every((v) => v.name !== index);
  return [
    state,
    Http({
      url: `./memos/${index}`,
      response: "text",
      action: (state, content) => {
        const getNewContents = () => {
          if (!exists) {
            return state.contents;
          } else {
            return [
              ...state.contents,
              {
                name: index,
                content: content,
              },
            ];
          }
        };
        return {
          ...state,
          content: { ...state.content, name: index, content: content },
          contents: getNewContents(),
        };
      },
    }),
  ];
};

const setInputValue = (state, event) => {
  const str = event.target.value;
  const indexes = onSearchIndex(state, str);
  return { ...state, inputValue: str, indexes: indexes };
};

const setInputContent = (state, event) => {
  const value = event.target.value;
  const content = state.contents.map((v) => {
    if (v.name == "memo") {
      v.content = value;
    }
    return v;
  });
  return {
    ...state,
    content: { ...state.content, content: value },
    contents: content,
  };
};

const removeContent = (state, index) => {
  if (state.content.name == index) {
    let id = 0;
    state.contents.forEach((v, i) => {
      if (v.name == index) {
        id = i;
      }
    });
    state.content = state.contents[id - 1];
  }
  state.contents = state.contents.filter((v) => v.name !== index);
  return { ...state };
};

const onSelect = (state, index) => {
  if (state.content.name == index) {
    return { ...state };
  }
  const content = state.contents.find((v) => {
    return v.name === index;
  });
  return {
    ...state,
    content: content,
  };
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

let state = {
  indexes: "",
  content: { name: "memo", content: "" },
  contents: [{ name: "memo", content: "" }],
  inputValue: "",
  showIndexes: true,
};

state = { ...state, ...JSON.parse(window.localStorage.getItem("app")) };

const initialState = [state, getJson];

app({
  init: initialState,
  view: ({ indexes, content, contents, inputValue, showIndexes }) =>
    h("main", { class: "main" }, [
      h("header", { class: "header" }, [
        h("div", { class: "home" }, [
          h(
            "span",
            {
              onclick: () => {
                window.location.href = "./";
              },
            },
            text("kis9a/")
          ),
          h(
            "span",
            {
              onclick: () => {
                window.location.href = "./";
              },
            },
            text("memos")
          ),
        ]),
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
        h(
          "div",
          { class: "tabs" },
          contents &&
            contents.map((c) =>
              h(
                "div",
                {
                  class: `tab ${content.name === c.name ? "selected" : ""}`,
                },
                [
                  h(
                    "span",
                    {
                      onclick: () => [onSelect, c.name],
                      class: "tab-label",
                    },
                    text(c.name)
                  ),
                  c.name !== "memo" &&
                    h(
                      "span",
                      {
                        onclick: () => [removeContent, c.name],
                        class: "tab-close",
                      },
                      text("X")
                    ),
                ]
              )
            )
        ),
        content.name == "memo"
          ? h("textarea", {
              rows: 20,
              value: content.content,
              oninput: setInputContent,
              class: "content tab-memo",
            })
          : h("div", {
              class: `content ${content.content ? "" : "hide"}`,
              innerHTML: snarkdown(content.content),
            }),
        h("div", { class: "top", innerHTML: topsvg, onclick: Top }),
      ]),
    ]),
  subscriptions: (state) =>
    window.localStorage.setItem("app", JSON.stringify(state)),
  node: document.getElementById("app"),
});
