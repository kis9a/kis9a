function historyPushEffect(dispatch, props) {
  var title = props.title || document.title;
  var url = props.url || location.href;

  history.pushState(props.state, title, url);
}

function historyReplaceEffect(dispatch, props) {
  var title = props.title || document.title;
  var url = props.url || location.href;

  history.replaceState(props.state, title, url);
}

export function HistoryPush(props) {
  return [historyPushEffect, props];
}

export function HistoryReplace(props) {
  return [historyReplaceEffect, props];
}
