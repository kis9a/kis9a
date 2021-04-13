import { h, app } from "hyperapp";

const SetCount = (state, { count }) => ({ ...state, count: count });
const SetAuto = (state, { auto }) => ({ ...state, auto: auto });
const CountUp = state => ({ ...state, count: state.count + 1 });
const SetInput = (state, value) => ({ ...state, input: value });
const SetToByInput = state => ({ ...state, count: parseInt(state.input, 10) });

const DelayCountUp = (state, { timeout }) => [
  state,
  delay(CountUp, { timeout })
];

const delayRunner = (dispatch, { action, timeout }) => {
  setTimeout(() => dispatch(action), timeout);
};

const delay = (action, { timeout }) => [delayRunner, { action, timeout }];

const tickRunner = (dispatch, { action, interval }) => {
  const id = setInterval(() => dispatch(action), interval);
  return () => clearInterval(id);
};

const tick = (action, { interval }) => [tickRunner, { action, interval }];

app({
  init: [
    { count: 0, auto: false, input: "100" },
    delay(CountUp, { timeout: 1000 })
  ],
  view: state => (
    <div>
      <div>count: {state.count}</div>
      <button onClick={[SetCount, { count: 0 }]}>Reset to 0</button>
      <button onClick={CountUp}>increment</button>
      <button onClick={[DelayCountUp, { timeout: 500 }]}>
        increment with delay
      </button>
      <button onClick={[SetAuto, { auto: !state.auto }]}>
        auto: {state.auto ? "enabled" : "disabled"}
      </button>

      <div>
        <button onClick={SetToByInput}>Set to</button>
        <input
          value={state.input}
          oninput={[SetInput, ev => ev.currentTarget.value]}
        />
      </div>
    </div>
  ),
  subscriptions: state => state.auto && tick(CountUp, { interval: 1000 }),
  node: document.body
});
