import { h, text, app } from "/modules/js/hyperapp.js";
import { Header } from "/components/header";
import "./index.css";
import "/modules/css/mvp.css";

app({
  init: {},
  view: () =>
    h("div", { class: "container" }, [
      Header(),
      h("main", {}, [h("h1", {}, text("Hello"))]),
    ]),
  subscriptions: () => {},
  node: document.getElementById("app"),
});
