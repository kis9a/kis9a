import { app, h, text } from "../lib/hyperapp.js";

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
    return await fetch(`./memos/${target}`).then((response) => response.text());
  } catch (e) {
    console.error(e);
  }
  return "";
};

const memoContent = await getContent("figlet.md");
console.log(memoContent);

const onIndexSearch = (state) => {
  console.log("hlo")
};

// -const AddTodo = (state) => ({
// -  ...state,
// -  value: "",
// -  todos: state.todos.concat(state.value),
// -});
// -
// -const NewValue = (state, event) => ({
// -  ...state,
// -  value: event.target.value,
// -});

const onClickIndex = (state) => {
  console.log("hello", state);
};

const searchIndex = (state) => {
  console.log(state);
};

app({
  init: { indexes: memosIndexes, value: "" },
  view: ({ indexes, value }) =>
    h("main", { class: "main" }, [
      h("header", { class: "header" }, [
        h("span", { class: "home" }, text("kis9a/memos")),
      ]),
      h("div", { class: "container" }, [
        h("input", {
          type: "text",
          onchange: onIndexSearch,
          placeholder: "search index",
          value,
          class: "index-search",
        }),
        h(
          "div",
          { class: "indexes" },
          indexes.map((index) =>
            h(
              "span",
              { class: "index", onclick: onClickIndex },
              text(index.name)
            )
          )
        ),
      ]),
    ]),
  node: document.getElementById("app"),
});
