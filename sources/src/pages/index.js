import { h, app } from "/modules/js/hyperapp.js";
import { Header } from "/components/header";
import "./index.css";
import "/layouts/index.css";
const doper = require("../modules/js/doper.js");

app({
  init: {},
  view: () => h("div", { class: "container" }, [Header(), h("main", {}, [])]),
  subscriptions: () => {},
  node: document.getElementById("app"),
});

(function () {
  const el = document.createElement("div");
  el.classList.add("box");
  document.body.appendChild(el);
  let node = doper("<div>Hello</div>", ".box");
  node.parent.style.position = "fixed";
  node.style.position = "absolute";
  node.style.fontSize = "60px";
  node.style.width = "50px";
  node.style.height = "50px";
  node.style.letterSpacing = "10px";
  node.minAnchorX = 0.2;
  node.maxAnchorX = 0.2;
  node.minAnchorY = 0.2;
  node.maxAnchorY = 0.2;
  function update() {
    node.rotation++;
    node.y = Math.sin(node.rotation * 0.05) * 100;
    requestAnimationFrame(update);
  }
  update();
})();

(function () {
  const el = document.createElement("div");
  el.classList.add("box1");
  document.body.appendChild(el);
  let node = doper("<div>World</div>", ".box1");
  node.parent.style.position = "fixed";
  node.style.fontSize = "50px";
  node.style.width = "50px";
  node.style.height = "50px";
  node.style.letterSpacing = "8px";
  node.minAnchorX = 0.8;
  node.maxAnchorX = 0.8;
  node.minAnchorY = 0.2;
  node.maxAnchorY = 0.6;
  function update() {
    node.rotation++;
    node.y = Math.cos(node.rotation * 0.02) * 30;
    requestAnimationFrame(update);
  }
  update();
})();
