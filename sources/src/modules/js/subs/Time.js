import { makeDispatchTime } from "../utils.js";

function intervalEffect(dispatch, props) {
  var dispatchTime = makeDispatchTime(dispatch, props);
  var everyInterval = setInterval(dispatchTime, props.every);
  return function () {
    everyInterval && clearInterval(everyInterval);
  };
}

export function Interval(props) {
  return [intervalEffect, props];
}
