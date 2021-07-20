import { h, text } from "/modules/js/hyperapp.js";
import { Toast } from "./index.js";

export const viewToast = () => {
  return h("button", { onclick: toast }, text("default"));
};

const toast = (state) => {
  Toast("default info");
  return { ...state };
};

export const viewToastError = () => {
  return h("button", { onclick: toastError }, text("error"));
};

const toastError = (state) => {
  Toast("error", { status: "err" });
  return { ...state };
};

export const viewToastSuccess = () => {
  return h("button", { onclick: toastSuccess }, text("success"));
};

const toastSuccess = (state) => {
  Toast("success", { status: "suc" });
  return { ...state };
};
