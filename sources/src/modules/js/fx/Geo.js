function getCurrentPositionEffect(dispatch, props) {
  navigator.geolocation.getCurrentPosition(
    function (result) {
      return dispatch(props.action, result);
    },
    function (error) {
      return dispatch(props.error, error);
    },
    props.options
  );
}

export function GetCurrentPosition(props) {
  return [getCurrentPositionEffect, props];
}
