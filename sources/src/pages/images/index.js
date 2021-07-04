import { h, text, app } from "/modules/js/hyperapp.js";
import { Http } from "/modules/js/Http.js";
import { Header } from "/components/header";
import "/layouts/index.css";
import "./index.css";

const getIndexes = Http({
  url: "/data/images-indexes.json",
  response: "json",
  action: (state, res) => {
    pureState.indexes = res;
    return {
      ...state,
      indexes: res || [],
    };
  },
});

// const getContent = (index) => {
//   return Http({
//     url: `/data/images/${index}`,
//     response: "text",
//     action: (state, content) => {
//       return {
//         ...state,
//         content: { ...state.content, name: index, content: content },
//         contents: [
//           ...state.contents,
//           {
//             name: index,
//             content: content,
//           },
//         ],
//       };
//     },
//   });
// };

const pureState = {
  indexes: [],
};

const initIndexes = getIndexes;
const initialState = [pureState, initIndexes];

const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

app({
  init: initialState,
  view: ({ indexes }) =>
    h("div", { class: "container" }, [
      Header(),
      h("main", {}, [
        h(
          "div",
          { class: "indexes" },
          indexes &&
            shuffle(indexes).map((s) =>
              h("img", { src: `/data/images/${s.name}` }, [])
            )
        ),
      ]),
    ]),
  subscriptions: () => {},
  node: document.getElementById("app"),
});
