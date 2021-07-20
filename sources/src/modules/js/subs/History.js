import { makeRemoveListener } from "../utils.js";

function historyPopEffect(dispatch, props) {
  return makeRemoveListener(window, dispatch, props.action, "popstate");
}

export function HistoryPop(props) {
  return [historyPopEffect, props];
}
