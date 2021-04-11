import { app, h, text } from "../lib/hyperapp.js";

// app({
//   init: {},
//   node: document.getElementById("app"),
//   view: () => h("h1", {}, [text("Hello "), h("i", {}, text("World!"))]),
// });
const AddTodo = (state) => ({
  ...state,
  value: "",
  todos: state.todos.concat(state.value),
});

const NewValue = (state, event) => ({
  ...state,
  value: event.target.value,
});

app({
  init: { todos: [], value: "" },
  view: ({ todos, value }) =>
    h("main", {}, [
      h("h1", {}, text("To do list")),
      h("input", { type: "text", oninput: NewValue, value }),
      h(
        "ul",
        {},
        todos.map((todo) => h("li", {}, text(todo)))
      ),
      h("button", { onclick: AddTodo }, text("New!")),
    ]),
  node: document.getElementById("app"),
});
/**
 * Emoji Search - Hyperapp.js Example
 * Based on https://github.com/ahfarmer/emoji-search
 */

// const { h, app } = hyperapp;

/**
 * Default Emoji List
 * The complete list will be fetched from a JSON file when main container is created
 */
// let emojiList = [
//   {
//     symbol: "⏳",
//     title: "Loading...",
//   },
// ];

// const filterEmoji = (searchText, maxResults) => {
//   return emojiList
//     .filter((emoji) => {
//       if (emoji.title.toLowerCase().includes(searchText.toLowerCase())) {
//         return true;
//       }

//       if (emoji.keywords.includes(searchText)) {
//         return true;
//       }

//       return false;
//     })
//     .slice(0, maxResults);
// };

// const state = {
//   filteredEmoji: filterEmoji("", 20),
// };

// const actions = {
//   search: (text) => ({ filteredEmoji: filterEmoji(text, 20) }),
//   getEmojiList: () => (state, actions) => {
//     fetch(
//       "https://raw.githubusercontent.com/ahfarmer/emoji-search/master/src/emojiList.json"
//     )
//       .then((data) => data.json())
//       .then((data) => {
//         emojiList = data;
//         actions.search("");
//       });
//   },
// };

// const EmojiItem = (emoji) => h("li", {}, `${emoji.symbol} ${emoji.title}`);

// const EmojiList = (emojis) => {
//   const list = emojis.map((emoji) => EmojiItem(emoji));
//   return h("ul", {}, list.length ? list : h("li", {}, "No matches"));
// };

// const view = (state, actions) =>
//   h("div", { className: "container", oncreate: () => actions.getEmojiList() }, [
//     h("h1", {}, "Emoji Search"),
//     h("input", {
//       type: "search",
//       placeholder: "Search...",
//       oninput: (e) => actions.search(e.target.value),
//     }),
//     EmojiList(state.filteredEmoji),
//   ]);

// window.main = app(state, actions, view, document.getElementById("app"));
