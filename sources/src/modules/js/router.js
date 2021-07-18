import {
  svg_home,
  svg_photo,
  svg_chart_bar,
  svg_template,
  svg_cube,
  svg_pencil_alt,
} from "/components/icons";

export const routes = [
  {
    name: "home",
    href: "/",
    icon: svg_home,
  },
  {
    name: "memos",
    href: "/memos/",
    icon: svg_pencil_alt,
  },
  {
    name: "images",
    href: "/images/",
    icon: svg_photo,
  },
  {
    name: "waka",
    href: "/waka/",
    icon: svg_chart_bar,
  },
  {
    name: "tools",
    href: "/tools/",
    icon: svg_cube,
  },
  // {
  //   name: "tools",
  //   href: "/tools/",
  //   icon: svg_cube,
  // },
  // {
  //   name: "comps",
  //   href: "/components/",
  //   icon: svg_template,
  // },
];

export const pushRoute = (name) => {
  const item = routes.find((v) => v.name == name);
  window.location.href = item.href;
};
