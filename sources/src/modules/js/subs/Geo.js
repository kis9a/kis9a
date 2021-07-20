function watchPositionEffect(dispatch, props) {
  var cancelId = navigator.geolocation.watchPosition(
    function (result) {
      return dispatch(props.action, result);
    },
    function (error) {
      return dispatch(props.error, error);
    },
    props.options
  );

  return function () {
    navigator.geolocation.clearWatch(cancelId);
  };
}

export function WatchPosition(props) {
  return [watchPositionEffect, props];
}
