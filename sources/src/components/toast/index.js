export const Toast = (
  msg,
  opts = {
    time: 1600,
    width: "320px",
    bottom: "10px",
    right: "10px",
    left: "auto",
    top: "auto",
    bg: "#f4f4f4",
  }
) => {
  const toast = document.createElement("div");
  toast.style.background = opts.bg;
  toast.style.bottom = opts.bottom;
  toast.style.left = opts.left;
  toast.style.right = opts.right;
  toast.style.top = opts.top;
  toast.style.width = opts.width;
  toast.style.position = "fixed";
  toast.style.padding = "1.2rem 1.6rem";
  toast.style.fontSize = "1.6rem";
  toast.style.borderRadius = "1rem 0.5rem 0rem 0.5rem";
  toast.style.border = "2px solid #e6e6e6";
  fadeIn(toast, 500);
  setTimeout(() => {
    fadeOut(toast, 500);
    setTimeout(() => {
      document.body.removeChild(toast);
      toast.style.display = "none";
    }, 500);
  }, opts.time);
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
        setTimeout(tick, 16);
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
        setTimeout(tick, 16);
    }
  };
  tick();
}
