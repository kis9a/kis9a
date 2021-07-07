import { h, text, app } from "/modules/js/hyperapp.js";
import { Http } from "/modules/js/Http.js";
import { Header } from "/components/header";
import "./index.css";
import "/layouts/index.css";

const getSvgs = Http({
  url: "/data/wakatime.json",
  response: "json",
  action: (state, json) => {
    pureState.svgs = json.svgs;
    return {
      ...state,
      svgs: json.svgs || [],
    };
  },
});

const pureState = {
  svgs: [],
};

const initSvgs = getSvgs;
const initialState = [pureState, initSvgs];

const yymmdd = (dt) => {
  var y = dt.getFullYear();
  var m = ("00" + (dt.getMonth() + 1)).slice(-2);
  var d = ("00" + dt.getDate()).slice(-2);
  return y + "-" + m + "-" + d;
};

const afterDay = (n) => {
  date.setDate(date.getDate() + n);
  return yymmdd(date);
};

const date = new Date();
const today = yymmdd(date);

const dateRange = (name) => {
  if (name == "w") {
    return -7;
  }
  if (name == "m") {
    return -30;
  }
  if (name == "y") {
    return -365;
  }
};

app({
  init: initialState,
  view: ({ svgs }) =>
    h("div", { class: "container" }, [
      Header(),
      h("main", {}, [
        h(
          "div",
          { class: "svgs" },
          svgs &&
            svgs.map((s) =>
              h("div", {}, [
                s.name &&
                  h(
                    "h2",
                    { class: "date" },
                    text(afterDay(dateRange(s.name)) + " - " + today)
                  ),
                h("div", { class: "item" }, [
                  h("img", { src: s.activity }),
                  h("img", { src: s.percent }),
                  h("img", { src: s.bar }),
                ]),
              ])
            )
        ),
      ]),
    ]),
  subscriptions: () => {},
  node: document.getElementById("app"),
});
