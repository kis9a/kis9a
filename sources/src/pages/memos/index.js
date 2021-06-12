import { app, h, text } from "/modules/js/hyperapp.js";
import snarkdown from "/modules/js/snarkdown.js";
import { Header } from "/components/header";
import { Http } from "/modules/js/Http.js";
import {
  svg_top,
  svg_close,
  svg_clear,
  svg_share,
  svg_raw,
  svg_memo,
} from "../../components/icons";

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
  alert("copied url to share link");
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
  contents: [{ name: "memo", content: "" }],
  inputValue: "",
  showIndexes: false,
  rawMode: false,
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

onscroll = function () {
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
  view: ({ indexes, content, contents, inputValue, showIndexes, rawMode }) =>
    h("main", { class: "main" }, [
      Header(),
      h("div", { class: "container" }, [
        h("div", { class: "inputs" }, [
          h("input", {
            type: "text",
            value: inputValue,
            oninput: setInputValue,
            class: "index-search",
          }),
          h("input", {
            type: "date",
            placeholder: "Date",
            class: "input",
          }),
          h("input", {
            type: "date",
            placeholder: "Date",
            class: "input",
          }),
          h("div", {
            class: "index-toggle-button",
            onclick: toggleShowIndex,
            innerHTML: `${showIndexes ? "&#9660" : "&#9650"}`,
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
          h("div", {
            class: "tab svg-share tab-share",
            onclick: () => toggleRaw,
            innerHTML: svg_raw,
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
                      class: "tab-label memo-tab-label",
                      innerHTML: c.name === "memo" ? svg_memo : "",
                    },
                    c.name !== "memo" ? text(c.name) : text("")
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
        content.name === "memo" &&
          h("div", { class: "tab-memo" }, [
            h("textarea", {
              rows: 20,
              value: content.content || " ",
              oninput: setInputContent,
              class: "content tab-memo-input",
            }),
            h("div", {
              class: "content tab-memo-view",
              innerHTML: snarkdown(content.content),
            }),
          ]),
        content.name !== "memo" &&
          h("div", {
            class: `content ${content.content ? "" : "no-content"}`,
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
