import { h, text, app } from "/modules/js/hyperapp";
import { Header } from "./index";

export const StoryHeader = () => {
  return [
    {
      name: "default",
      view: defaultHeader,
    },
  ];
};

const defaultHeader = (list) => h("p", {}, text(list));
