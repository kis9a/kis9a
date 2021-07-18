import { app, h, text } from "/modules/js/hyperapp.js";
import snarkdown from "/modules/js/snarkdown.js";
import { Header } from "/components/header";
import { Http } from "/modules/js/Http.js";
import { Toast } from "/components/toast";
import {
  svg_top,
  svg_close,
  svg_clear,
  svg_share,
  svg_raw,
  svg_pencil_alt,
  svg_tag,
} from "/components/icons";
import "./index.css";
import "/layouts/index.css";

const getIndexesJson = Http({
  url: "/data/memos-indexes.json",
  response: "json",
  action: (state, indexes) => {
    initialState[0].indexes = indexes;
    return {
      ...state,
      indexes: indexes || [],
    };
  },
});

const getCategories = Http({
  url: "/data/memos-categories.json",
  response: "json",
  action: (state, categories) => {
    initialState[0].categories = categories;
    return {
      ...state,
      categories: categories || [],
    };
  },
});

const getContent = (index) => {
  return Http({
    url: `/data/memos/${index}`,
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
  if (str === "") {
    return { ...state, inputValue: str, indexes: indexes, showIndexes: false };
  }
  return { ...state, inputValue: str, indexes: indexes, showIndexes: true };
};

const onInputFocus = (state) => {
  if (state.inputValue === "") {
    return { ...state, showIndexes: false };
  }
  return { ...state };
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

const getContentType = (content) => {
  switch (content.name) {
    case "memo":
      return "memo";
    case "category":
      return "category";
    default:
      return "default";
  }
};

const onClickCategory = (state, category) => {
  const indexes = [];
  category.files.forEach((v) => {
    const index = { name: v, upd_t: "" };
    indexes.push(index);
  });
  return { ...state, indexes: indexes, showIndexes: true };
};

const onSelect = (state, index) => {
  if (state.content.name == index) {
    return { ...state };
  }
  const content = state.contents.find((v) => {
    return v.name === index;
  });
  if (content) {
    return {
      ...state,
      content: content,
    };
  } else {
    return { ...state };
  }
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
  Toast("Copied to clipboard share url");
  return { ...state };
};

const toggleRaw = (state) => {
  return { ...state, rawMode: !state.rawMode };
};

const Top = (state) => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  return state;
};

const pureState = {
  indexes: "",
  content: { name: "memo", content: "" },
  contents: [
    { name: "category", content: "" },
    { name: "memo", content: "" },
  ],
  categories: [],
  inputValue: "",
  showIndexes: false,
  rawMode: false,
};

const baseName = (str) => {
  return new String(str).substring(str.lastIndexOf("/") + 1);
};

const initIndexes = getIndexesJson;

const initCategories = getCategories;

const initContent = [
  (dispatch) => {
    const url = initialUrl;
    const cname = baseName(url);
    let content = pureState.content;
    if (cname && cname !== "memo") {
      const action = (state) => {
        content = state.contents.find((v) => v.name === cname);
        if (!content) {
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

// const storageState = JSON.parse(window.localStorage.getItem("app"));

// const state = storageState ? storageState : pureState;

const initialState = [pureState, initIndexes, initContent, initCategories];

onscroll = () => {
  const top = document.getElementById("top");
  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  if (scrollTop > 500) {
    top.classList.remove("hide");
  } else {
    top.classList.add("hide");
  }
};

app({
  init: initialState,
  view: ({
    indexes,
    content,
    contents,
    categories,
    inputValue,
    showIndexes,
    rawMode,
  }) =>
    h("div", { class: "container" }, [
      Header(),
      h("main", {}, [
        h("div", { class: "content" }, [
          h("div", { class: "tabs" }, [
            h("div", {
              class: "tab",
              onclick: clearTabs,
              innerHTML: svg_clear,
            }),
            h("div", {
              class: "tab",
              onclick: () => copyUrl,
              innerHTML: svg_share,
            }),
            h("div", {
              class: "tab",
              onclick: () => toggleRaw,
              innerHTML: svg_raw,
            }),
            h("div", {
              class: "tab index-toggle-button",
              onclick: toggleShowIndex,
              innerHTML: `${showIndexes ? "&#9660" : "&#9650"}`,
            }),
            h("input", {
              type: "text",
              value: inputValue,
              oninput: setInputValue,
              onfocus: onInputFocus,
              class: "index-search",
            }),
            ...(contents &&
              contents.map((c) =>
                h(
                  "div",
                  {
                    class: `tab ${content.name === c.name ? "selected" : ""}`,
                    onclick: () => [onSelect, c.name],
                    innerHTML:
                      c.name === "memo"
                        ? svg_pencil_alt
                        : c.name == "category"
                        ? svg_tag
                        : `<span class="tab-label">${c.name}</span>`,
                  },
                  [
                    c.name !== "memo" &&
                      c.name !== "category" &&
                      h("div", {
                        onclick: () => [removeContent, c.name],
                        innerHTML: svg_close,
                        class: "tab-close",
                      }),
                  ]
                )
              )),
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
          getContentType(content) === "memo" &&
            h("div", { class: "tab-memo" }, [
              h("textarea", {
                rows: 15,
                value: content.content || "",
                oninput: setInputContent,
                class: "content tab-memo-input",
              }),
            ]),
          getContentType(content) === "category" &&
            h(
              "div",
              { class: "tab-content tab-category" },
              getCategories &&
                categories.map(
                  (c) =>
                    c.files &&
                    c.files.length > 1 &&
                    h(
                      "div",
                      {
                        class: "category",
                        onclick: [onClickCategory, c],
                        style: {
                          fontSize: `${8 + c.files.length * 4}px`,
                        },
                      },
                      text(c.name)
                    )
                )
            ),
          getContentType(content) === "default" &&
            h("div", {
              class: `tab-content ${content.content ? "" : "no-content"}`,
              innerHTML: rawMode ? content.content : snarkdown(content.content),
            }),
          h("div", {
            id: "top",
            class: "svg-top hide",
            innerHTML: svg_top,
            onclick: Top,
          }),
        ]),
      ]),
    ]),
  subscriptions: (state) => {
    const cname = state.content && state.content.name;
    if (cname && cname !== "memo") {
      window.location.href = `#/${cname}`;
    } else if (cname == "memo") {
      window.location.href = "#/";
    }
    // window.localStorage.setItem("app", JSON.stringify(state));
  },
  node: document.getElementById("app"),
});
