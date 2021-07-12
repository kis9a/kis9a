import "./index.css";

export const Toast = (msg, opts = { time: 1000 }) => {
  const toast = document.createElement("div");
  toast.setAttribute("id", "toast");
  toast.setAttribute("class", "show");
  toast.appendChild(document.createTextNode(msg));
  toast.className = "show";
  document.body.appendChild(toast);
  setTimeout(function () {
    toast.className = toast.className.replace("show", "");
  }, opts.time);
};
