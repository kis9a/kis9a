import { assign } from "../utils.js";

function storageArea(area) {
  return window[area + "Storage"] || localStorage;
}

function writeToStorageEffect(_, props) {
  var value = props.converter(props.value);
  storageArea(props.area).setItem(props.key, value);
}

function readFromStorageEffect(dispatch, props) {
  try {
    var value = props.converter(storageArea(props.area).getItem(props.key));
    var dispatchProps = assign({}, props.props || {});
    dispatchProps[props.prop || "value"] = value;
    dispatch(props.action, dispatchProps);
  } catch (error) {
    dispatch(props.error);
  }
}

function removeFromStorageEffect(_, props) {
  storageArea(props.area).removeItem(props.key);
}

export function WriteToStorage(props) {
  return [
    writeToStorageEffect,
    assign(
      {
        converter: props.converter || JSON.stringify,
      },
      props
    ),
  ];
}

export function ReadFromStorage(props) {
  return [
    readFromStorageEffect,
    assign(
      {
        converter: props.converter || JSON.parse,
        error: props.error,
      },
      props
    ),
  ];
}

export function RemoveFromStorage(props) {
  return [removeFromStorageEffect, props];
}
