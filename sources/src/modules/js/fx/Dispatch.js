function dispatchEffect(dispatch, props) {
  dispatch(props.action);
}

export function Dispatch(action) {
  return [dispatchEffect, { action: action }];
}
