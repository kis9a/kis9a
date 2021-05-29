import { h, text } from "/lib/hyperapp.js";

export const Header = () => {
  return h("header", { class: "header" }, [
    h("div", { class: "home" }, [
      h(
        "span",
        {
          onclick: () => {
            window.location.href = "/";
          },
        },
        text("KIS9A")
      ),
      h("span", {}, text(".")),
      h("span", {}, text("memos")),
    ]),
  ]);
};
