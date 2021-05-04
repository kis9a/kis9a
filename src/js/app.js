import { app, h, text } from "../lib/hyperapp.js";
import { Http } from "../lib/hyperapp-fx/fx/Http.js";
import snarkdown from "../lib/snarkdown.js";

const getIndexesJson = Http({
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

const getContent = (index) => {
  return Http({
    url: `./memos/${index}`,
    response: "text",
    action: (state, content) => {
      return {
        ...state,
        content: { ...state.content, name: index, content: content },
        contents: [
          ...state.contents,
          {
            name: index,
            content: content,
          },
        ],
      };
    },
  });
};

const setContent = (state, event) => {
  const index = event.target.innerHTML;
  const exists = !state.contents.every((v) => {
    return v.name !== index;
  });
  if (exists) {
    const content = state.contents.find((v) => v.name === index);
    return {
      ...state,
      content: content,
    };
  }
  return [state, getContent(index)];
};

const setInputValue = (state, event) => {
  const str = event.target.value;
  const indexes = onSearchIndex(state, str);
  return { ...state, inputValue: str, indexes: indexes, showIndexes: true };
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

const clearTabs = (state) => {
  const content = state.contents.find((v) => v.name === "memo");
  content.content = "";
  const contents = [{ ...content }];
  return { ...state, content: content, contents: contents };
};

const copyUrl = (state) => {
  const element = document.createElement("input");
  element.value = location.href;
  document.body.appendChild(element);
  element.select();
  document.execCommand("copy");
  document.body.removeChild(element);
  alert("copied url to share link");
  return {...state}
};

const svg_top =
  '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"></path></svg>';

const svg_close =
  '<svg class="w-6 h-6" data-darkreader-inline-fill="" data-darkreader-inline-stroke="" fill="none" stroke="currentColor" style="--darkreader-inline-fill:none; --darkreader-inline-stroke:currentColor;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';

const svg_clear =
  '<svg class="w-6 h-6" data-darkreader-inline-fill="" data-darkreader-inline-stroke="" fill="none" stroke="currentColor" style="--darkreader-inline-fill:none; --darkreader-inline-stroke:currentColor;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>';

const svg_share =
  '<svg class="w-6 h-6" data-darkreader-inline-fill="" data-darkreader-inline-stroke="" fill="none" stroke="currentColor" style="--darkreader-inline-fill:none; --darkreader-inline-stroke:currentColor;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>';

const Top = (state) => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  return state;
};

const pureState = {
  indexes: "",
  content: { name: "memo", content: "" },
  contents: [{ name: "memo", content: "" }],
  inputValue: "",
  showIndexes: true,
};

const baseName = (str) => {
  return new String(str).substring(str.lastIndexOf("/") + 1);
};

const initIndexes = getIndexesJson;

const initContent = [
  (dispatch) => {
    const url = initialUrl;
    const cname = baseName(url);
    let content = pureState.content;
    if (cname && cname !== "memo") {
      const action = (state) => {
        content = state.contents.find((v) => v.name === cname);
        if (!content) {
          console.log("!content");
          content = getContent(cname);
          return [state, content];
        }
        return {
          ...state,
          content: content,
        };
      };
      dispatch(action);
    }
  },
];

const getUrl = () => window.location.href;
const initialUrl = getUrl();

const storageState = JSON.parse(window.localStorage.getItem("app"));

const state = storageState ? storageState : pureState;

const initialState = [state, initIndexes, initContent];

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
                { class: "index", onclick: setContent },
                text(index.name)
              )
            )
        ),
        h("div", { class: "tabs" }, [
          h("div", {
            class: "tab svg-clear tab-clear",
            onclick: clearTabs,
            innerHTML: svg_clear,
          }),
          h("div", {
            class: "tab svg-share tab-share",
            onclick: () => copyUrl,
            innerHTML: svg_share,
          }),
          ...(contents &&
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
                    h("div", {
                      onclick: () => [removeContent, c.name],
                      innerHTML: svg_close,
                      class: "svg-close tab-close",
                    }),
                ]
              )
            )),
        ]),
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
        h("div", { class: "svg-top", innerHTML: svg_top, onclick: Top }),
      ]),
    ]),
  subscriptions: (state) => {
    const cname = state.content && state.content.name;
    if (cname && cname !== "memo") {
      window.location.href = `#/${cname}`;
    } else if (cname == "memo") {
      window.location.href = "#/";
    }
    window.localStorage.setItem("app", JSON.stringify(state));
  },
  node: document.getElementById("app"),
});
