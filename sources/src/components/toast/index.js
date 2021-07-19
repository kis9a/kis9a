export const Toast = (
  msg,
  {
    time = 1600,
    width = "280px",
    bottom = "10px",
    right = "10px",
    left = "auto",
    top = "auto",
    bg = "#ffffff",
    status = "info",
  } = {}
) => {
  const toast = document.createElement("div");
  toast.style.background = bg;
  if (status === "err") {
    toast.style.background = "#e93c00";
  }
  if (status === "suc") {
    toast.style.background = "#68c39f";
  }
  toast.style.bottom = bottom;
  toast.style.left = left;
  toast.style.right = right;
  toast.style.top = top;
  toast.style.width = width;
  toast.style.position = "fixed";
  toast.style.padding = "0.8rem 1.2rem";
  toast.style.fontSize = "1.2rem";
  toast.style.borderRadius = "0.5rem 0rem 0rem 0rem";
  toast.style.border = "1px solid #d0c9c3";
  toast.style.boxShadow = "0 0 2px 2px #f2f2f2";
  toast.style.fontColor = "inherit";

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
