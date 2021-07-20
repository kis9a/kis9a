function generateRandom(props) {
  if (props.values) {
    return props.values.map(generateRandom);
  }
  var min = props.min || 0;
  var max = props.max || 1;
  if (props.int) max++;
  if (props.bool) {
    min = 0;
    max = 2;
  }
  var randomValue = Math.random() * (max - min) + min;
  if (props.int || props.bool) {
    randomValue = Math.floor(randomValue);
  }
  if (props.bool) {
    randomValue = !!randomValue;
  }
  return randomValue;
}

function randomEffect(dispatch, props) {
  var randomValue = generateRandom(props);
  dispatch(props.action, randomValue);
}

export function Random(props) {
  return [randomEffect, props];
}
