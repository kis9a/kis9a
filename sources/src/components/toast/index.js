import svg_info from "/assets/svgs/information-circle.svg";
import svg_warn from "/assets/svgs/exclamation.svg";
import svg_check from "/assets/svgs/check-circle.svg";

export const Toast = (
  msg,
  {
    time = 1600,
    minWidth = "300px",
    height = "auto",
    width = "auto",
    bottom = "10px",
    right = "10px",
    left = "auto",
    top = "auto",
    bg = "#f5f5f5",
    status = "info",
  } = {}
) => {
  const toast = document.createElement("div");
  let svg = svg_info;
  switch (status) {
    case "err":
      toast.style.background = "#e93c00";
      svg = svg_warn;
      break;
    case "suc":
      toast.style.background = "#68c39f";
      svg = svg_check;
      break;
    default:
      toast.style.background = bg;
  }
  toast.innerHTML = svg;
  toast.style.bottom = bottom;
  toast.style.left = left;
  toast.style.right = right;
  toast.style.top = top;
  toast.style.width = width;
  toast.style.minWidth = minWidth;
  toast.style.height = height;
  toast.style.display = "flex";
  toast.style.alignItems = "center";
  toast.style.position = "fixed";
  toast.style.margin = "10px";
  toast.style.padding = "0.8rem 1.6rem";
  toast.style.fontSize = "1.8rem";
  toast.style.color = "inherit";
  toast.style.borderRadius = "0.5rem 0rem 0rem 0rem";
  toast.style.border = "1px solid #d0c9c3";
  toast.style.boxShadow = "0 0 2px 2px #f2f2f2";

  const svgNode = toast.childNodes[0];
  svgNode.style.height = "2.5rem";
  svgNode.style.width = "auto";
  svgNode.style.color = "inherit";
  svgNode.style.marginRight = "12px";

  fadeIn(toast, 500);
  setTimeout(() => {
    fadeOut(toast, 500);
    setTimeout(() => {
      document.body.removeChild(toast);
      toast.style.display = "none";
    }, 500);
  }, time);
  toast.appendChild(document.createTextNode(msg));
  document.body.appendChild(toast);
};

function fadeIn(el, time) {
  el.style.opacity = 0;
  var last = +new Date();
  var tick = function () {
    el.style.opacity = +el.style.opacity + (new Date() - last) / time;
    last = +new Date();
    if (+el.style.opacity < 1) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) ||
        setTimeout(tick, 10);
    }
  };
  tick();
}

function fadeOut(el, time) {
  el.style.opacity = 1;
  var last = +new Date();
  var tick = function () {
    el.style.opacity = +el.style.opacity - (new Date() - last) / time;
    last = +new Date();
    if (+el.style.opacity > 0) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) ||
        setTimeout(tick, 10);
    }
  };
  tick();
}
