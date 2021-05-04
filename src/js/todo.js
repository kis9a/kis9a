import { h, text, app } from "../lib/hyperapp.js";
import { nanoid } from "../lib/nanoid.js";

const AddTodo = (state) => ({
  ...state,
  value: "",
  todos: state.todos.concat(state.value),
});

const NewValue = (state, event) => ({
  ...state,
  value: event.target.value,
});

// Sets the new item input value in the state
const SetInput = (state, ev) => ({
  ...state,
  input: ev.target.value,
});

// Toggle the state viewer
const ToggleStateViewer = (state) => ({
  ...state,
  showState: !state.showState,
});

// Adds a new item in the array
// and resets the input.
const AddItem = (state, ev) => {
  ev.preventDefault();
  return {
    ...state,
    input: "",
    items: state.items.concat({
      id: nanoid(),
      value: state.input,
      done: false,
      editing: false,
    }),
  };
};

// Updates the "value" attribute of an item by ID
const UpdateItem = (state, id, ev) => ({
  ...state,
  items: state.items.map((item) =>
    id === item.id ? { ...item, value: ev.target.value } : item
  ),
});

// Inverts the "done" attribute of an item by ID
const ToggleItem = (state, id) => ({
  ...state,
  items: state.items.map((item) =>
    id === item.id ? { ...item, done: !item.done } : item
  ),
});

// Inverts the "editing" attribute of an item by ID,
// and sets to false for all other items
const ToggleItemEditing = (state, id, ev) => {
  ev.preventDefault();
  return {
    ...state,
    items: state.items.map((item) =>
      id === item.id
        ? { ...item, editing: !item.editing }
        : { ...item, editing: false }
    ),
  };
};

// Removes an item in the array by ID
const DeleteItem = (state, id) => ({
  ...state,
  items: state.items.filter((item) => id !== item.id),
});

// Removes all "done" items
const ClearCheckedItems = (state) => ({
  ...state,
  items: state.items.filter((item) => !item.done),
});

// app({
//   init: { todos: [], value: "" },
//   view: ({ todos, value }) =>
//     h("main", {}, [
//       h("h1", {}, text("To do list")),
//       h("input", { type: "text", oninput: NewValue, value }),
//       h(
//         "ul",
//         {},
//         todos.map((todo) => h("li", {}, text(todo)))
//       ),
//       h("button", { onclick: AddTodo }, text("New!")),
//     ]),
//   node: document.getElementById("todo"),
// });
