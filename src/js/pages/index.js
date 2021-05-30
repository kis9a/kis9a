import { h, text, app, memo } from "/js/lib/hyperapp.js";

//////Declare the variables for home, about & contact html pages{{{
////let home = "";
////let about = "";
////let contact = "";

/////**
//// *
//// * @param {String} page - Represents the page information that needs to be retrieved
//// * @returns {String} resHtml - The Page's HTML is returned from the async invocation
//// */

////const loadPage = async (page) => {
////  const response = await fetch(page);
////  const resHtml = await response.text();
////  return resHtml;
////};

/////**
//// * The Async function loads all HTML to the variables 'home', 'about' & 'contact'
//// */
////const loadAllPages = async () => {
////  // home = await loadPage("home.html");
////  home = "<div>Hello</div>"
////  // about = await loadPage("about.html");
////  // contact = await loadPage("contact.html");
////};

//////Get the Element with the Id 'root'
////const rootDiv = document.getElementById("root");

/////**
//// * The Main Function is an async function that first loads All Page HTML to the variables
//// * Once the variables are loaded with the contents, then they are assigned to the 'routes' variable
//// */
////const main = async () => {
////  await loadAllPages();
////  rootDiv.innerHTML = home;
////  routes = {
////    "/": home,
////    "/contact": contact,
////    "/about": about,
////  };
////};

/////**
//// *
//// * @param {String} pathname - Pass the 'pathname' passed from onClick function of the link (index.html)
//// * The function is invoked when any link is clicked in the HTML.
//// * The onClick event on the HTML invokes the onNavClick & passes the pathname as param
//// */
////const onNavClick = (pathname) => {
////  window.history.pushState({}, pathname, window.location.origin + pathname);
////  rootDiv.innerHTML = routes[pathname];
////};

/////**
//// * The Function is invoked when the window.history changes
//// */
////window.onpopstate = () => {
////  rootDiv.innerHTML = routes[window.location.pathname];
////};
////// Invoke the Main function
//// main();//}}}

//const push = () => {
//  console.log("push");
//};

//const replace = () => {
//  console.log("push");
//  console.log("push");
//  console.log("push");
//  console.log("push");
//};

//const onLocationChanged = () => {
//  console.log("on location changed");
//};
//
const onRoute = () => {
  const pathname = window.location.pathname;
  console.log("on route", pathname);
};

//window.addEventListener("popstate", onLocationChanged);
window.history.pushState = () => {
  console.log("pushState");
  onRoute();
};
// window.history.replaceState = () => {
//   console.log("replaceState");
//   onRoute();
// };

//history.replaceState(null, null, "/hoge3");
// function onLocationChanged() {
//   const pathname = window.location.pathname;
//   debug([pathname]);
//   for (const route of props.routes) {
//     route._pathSegs = route._pathSegs || splitPath(route.path);
//     const params = matchPath(pathname, route._pathSegs);
//     if (params) {
//       props.matched({ route, params }, dispatch);
//       return;
//     }
//   }
//   props.matched(undefined, dispatch);
// }

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
    // console.log("path", path);
    // state.route = "about";
    console.log(state.route);
  },
  node: document.getElementById("app"),
});

// history.replaceState(null, null, "/hoge")
