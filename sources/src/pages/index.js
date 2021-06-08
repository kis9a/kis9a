import { h, text, app, memo } from "../modules/js/hyperapp.js";

const onRoute = () => {
  const pathname = window.location.pathname;
  console.log("on route", pathname);
};

window.history.pushState = () => {
  console.log("pushState");
  onRoute();
};

const randomHex = () => "0123456789ABCDEF"[Math.floor(Math.random() * 16)];
const randomColor = () => "#" + Array.from({ length: 6 }, randomHex).join("");

const listView = (list) =>
  h(
    "p",
    {
      style: {
        backgroundColor: randomColor(),
        color: randomColor(),
      },
    },
    text(list)
  );

const MoreItems = (state) => ({ ...state, list: [...state.list, randomHex()] });
const Increment = (state) => ({ ...state, counter: state.counter + 1 });

const nview = () => h("h1", {}, text("nview"));
const fview = () => h("h1", {}, text("fview"));

const ChangeUrl = (state) => {
  window.history.replaceState("", "", "/about");
  onRoute();
  return { ...state };
};

const ToHome = (state) => {
  window.history.replaceState("", "", "/");
  onRoute();
  return { ...state };
};

// const route = (state) => {
//   console.log("just routel", state);
//   state.
// };

app({
  init: {
    list: ["a", "b", "c"],
    counter: 0,
    route: "home",
  },
  view: (state) =>
    h("main", {}, [
      h("button", { onclick: MoreItems }, text("Grow list")),
      h("button", { onclick: Increment }, text("+1 to counter")),
      h("button", { onclick: ChangeUrl }, text("change")),
      h("button", { onclick: ToHome }, text("change")),
      h("p", {}, text(`Counter: ${state.counter}`)),
      h("p", {}, text("Regular view showing list:")),
      listView(state.list),
      h("p", {}, text("Memoized view showing list:")),
      memo(listView, state.list),
      state.route == "home" && nview(),
      state.route == "about" && fview(),
    ]),
  subscriptions: (state) => {
    const path = window.location.pathname;
    if (path == "/about") {
      state.route = "about";
    } else if (path == "/") {
      state.route = "home";
    }
    console.log(state.route);
  },
  node: document.getElementById("app"),
});

// history.replaceState(null, null, "/hoge")
