import { makeDispatchTime } from "../utils.js";

function nowEffect(dispatch, props) {
  makeDispatchTime(dispatch, props)();
}

function delayEffect(dispatch, props) {
  setTimeout(makeDispatchTime(dispatch, props), props.wait);
}

export function Now(props) {
  return [nowEffect, props];
}

export function Delay(props) {
  return [delayEffect, props];
}
