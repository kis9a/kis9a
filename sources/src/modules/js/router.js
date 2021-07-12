import {
  svg_memo,
  svg_home,
  svg_photo,
  svg_chart_bar,
} from "/components/icons";

export const routes = [
  {
    name: "home",
    href: "/",
    icon: svg_home,
  },
  {
    name: "memos",
    href: "/memos",
    icon: svg_memo,
  },
  {
    name: "waka",
    href: "/waka",
    icon: svg_chart_bar,
  },
  {
    name: "images",
    href: "/images",
    icon: svg_photo,
  },
];

export const pushRoute = (name) => {
  const item = routes.find((v) => v.name == name);
  window.location.href = item.href;
};
