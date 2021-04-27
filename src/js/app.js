import { app, h, text } from "../lib/hyperapp.js";
// import { Http } from "../lib/hyperappFx.js"
import * as Fx from "../lib/hyperappFx.js";

marked.setOptions({
  langPrefix: "",
  highlight: function (code, lang) {
    return hljs.highlightAuto(code, [lang]).value;
  },
});

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

const memosIndexes = await getJson("memos-indexes").then((r) => r);

const getContent = async (target) => {
  try {
    return await fetch(`../memos/${target}`).then((response) =>
      response.text()
    );
  } catch (e) {
    console.error(e);
  }
  return "";
};

const memoContent = await getContent("figlet.md");

const onClickIndex = async (state, actions) => {

  Fx.Http({
    url: "https://api.quotable.io/random",
    action: (_, { content }) => content,
  });
  // const content = await getContent(event.target.innerText).then((r) => r);
  // console.log({ ...state, content: content });
  // state.content = content;
  // actions.up(10); ///<<<< why should this change state?
  // return { ...state, content: content };
  console.log(actions);
  return { ...state, content: "" };
};

const setInputValue = (state, event) => {
  const str = event.target.value;
  const indexes = onSearchIndex(state, str);
  return { ...state, inputValue: str, indexes: indexes };
};

const setInitialIndex = (state) => {
  state.indexes = memosIndexes;
};

const viewContent = (content) => h("div", { class: "content" }, text(content));

const onSearchIndex = (state, str) => {
  if (!str) setInitialIndex(state);
  const indexes = state.indexes.filter((e) =>
    ~e.name.indexOf(str) ? true : false
  );
  return indexes;
};

app({
  init: { indexes: memosIndexes, content: memoContent, inputValue: "" },
  view: ({ indexes, content, inputValue }) =>
    h("main", { class: "main" }, [
      h("header", { class: "header" }, [
        h("span", { class: "home" }, text("kis9a/memos")),
      ]),
      h("div", { class: "container" }, [
        h("input", {
          type: "text",
          value: inputValue,
          oninput: setInputValue,
          placeholder: "Search index",
          class: "index-search",
        }),
        h(
          "div",
          { class: "indexes" },
          indexes &&
            indexes.map((index) =>
              h(
                "span",
                { class: "index", onclick: onClickIndex },
                text(index.name)
              )
            )
        ),
        viewContent(content),
      ]),
    ]),
  node: document.getElementById("app"),
});
