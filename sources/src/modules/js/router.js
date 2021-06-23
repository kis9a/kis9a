export const routes = [
  {
    name: "home",
    href: "/",
  },
  {
    name: "memos",
    href: "/memos",
  },
  {
    name: "waka",
    href: "/waka",
  },
  {
    name: "images",
    href: "/images",
  },
];

export const pushRoute = (name) => {
  const item = routes.find((v) => v.name == name);
  window.location.href = item.href;
};
