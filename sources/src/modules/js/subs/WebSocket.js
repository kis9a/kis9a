import {
  getOpenWebSocket,
  makeRemoveListener,
  closeWebSocket,
} from "../utils.js";

function webSocketListenEffect(dispatch, props) {
  var connection = getOpenWebSocket(props);
  var removeListen = makeRemoveListener(
    connection.socket,
    dispatch,
    props.action,
    "message"
  );
  connection.listeners.push(removeListen);
  var removeError;
  if (props.error) {
    removeError = makeRemoveListener(
      connection.socket,
      dispatch,
      props.error,
      "error"
    );
    connection.listeners.push(removeError);
  }
  var removeOpen;
  if (props.open) {
    removeOpen = makeRemoveListener(
      connection.socket,
      dispatch,
      props.open,
      "open"
    );
    connection.listeners.push(removeOpen);
  }
  var removeClose;
  if (props.close) {
    removeClose = makeRemoveListener(
      connection.socket,
      dispatch,
      props.close,
      "close"
    );
    connection.listeners.push(removeClose);
  }

  return function () {
    removeListen && removeListen();
    removeError && removeError();
    removeOpen && removeOpen();
    removeClose && removeClose();
    connection.listeners = connection.listeners.filter(function (listener) {
      return (
        listener !== removeListen &&
        listener !== removeError &&
        listener !== removeOpen &&
        listener !== removeClose
      );
    });
    if (connection.listeners.length === 0) {
      closeWebSocket(props);
    }
  };
}

export function WebSocketListen(props) {
  return [webSocketListenEffect, props];
}
