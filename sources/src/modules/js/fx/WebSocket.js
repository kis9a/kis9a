import { getOpenWebSocket } from "../utils.js";

function webSocketSendEffect(dispatch, props) {
  var connection = getOpenWebSocket(props);
  function sendMessage() {
    connection.socket.send(props.data);
    connection.socket.removeEventListener("open", sendMessage);
  }
  if (connection.socket.readyState === WebSocket.CONNECTING) {
    connection.socket.addEventListener("open", sendMessage);
  } else {
    sendMessage();
  }
}

export function WebSocketSend(props) {
  return [webSocketSendEffect, props];
}
