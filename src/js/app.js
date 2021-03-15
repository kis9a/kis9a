const app = document.getElementById("app");
let memos = [];

const main = async () => {
  memos = (await getMemosJson()) || [];
  marked.setOptions({
    // code要素にdefaultで付くlangage-を削除
    langPrefix: "",
    // highlightjsを使用したハイライト処理を追加
    highlight: function (code, lang) {
      return hljs.highlightAuto(code, [lang]).value;
    },
  });
  renderHeader();
  renderLinks();
  renderContent();
};

const renderLinks = async () => {
  const linkContainer = document.createElement("div");
  linkContainer.setAttribute("id", "link-container");

  const linkSearch = document.createElement("input");
  linkSearch.setAttribute("id", "link-search");
  linkSearch.setAttribute("placeholder", "Search index");
  linkContainer.appendChild(linkSearch);

  if (screen.width <= 800) {
    linkContainer.setAttribute("style", "display: none;");
  }

  window.onresize = () => {
    if (screen.width <= 800) {
      console.log("resize");
      linkContainer.setAttribute("style", "display: none;");
    }
  };

  const links = document.createElement("div");
  links.setAttribute("id", "links");

  memos.forEach((memo) => {
    const link = document.createElement("div");
    link.setAttribute("onClick", `onClickMemoLink('${memo.name}')`);
    link.setAttribute("class", "link");
    link.append(memo.name);
    links.appendChild(link);
  });
  linkContainer.appendChild(links);

  app.appendChild(linkContainer);

  linkSearch.addEventListener(
    "input",
    function (e) {
      const oldLinks = document.getElementById("links");
      if (oldLinks) {
        linkContainer.removeChild(oldLinks);
      }

      const links = document.createElement("div");
      links.setAttribute("id", "links");

      if (!e.target.value.trim() === "") {
        const link = document.createElement("div");
        link.setAttribute("onClick", `onClickMemoLink('${memo.name}')`);
        link.setAttribute("class", "link");
        link.append(memo.name);
        links.appendChild(link);
      } else {
        memos.forEach((memo) => {
          if (~memo.name.indexOf(e.target.value)) {
            const link = document.createElement("div");
            link.setAttribute("onClick", `onClickMemoLink('${memo.name}')`);
            link.setAttribute("class", "link");
            link.append(memo.name);
            links.appendChild(link);
          }
        });
      }
      linkContainer.appendChild(links);
    },
    false
  );
};

const onClickMemoLink = (name = "") => {
  const memo = memos.find((memo) => memo.name === name);
  renderContent(memo);
};

const renderHeader = () => {
  const header = document.createElement("div");
  header.setAttribute("id", "header");
  app.appendChild(header);

  const headerLink = document.createElement("a");
  headerLink.setAttribute("href", "/kis9a");
  headerLink.append("HOME");
  header.appendChild(headerLink);

  const burgerButton = document.createElement("div");
  burgerButton.setAttribute("onClick", "onClickBerger()");
  burgerButton.setAttribute("id", "burger-button");
  burgerButton.append("-_-");
  header.appendChild(burgerButton);

  // TODO search memo content string
  // const memoSearch = document.createElement("input");
  // memoSearch.setAttribute("type", "text");
  // memoSearch.setAttribute("id", "memo-search");
  // header.appendChild(memoSearch);
};

const onClickBerger = () => {
  const linkContainer = document.getElementById("link-container");
  if (!linkContainer || linkContainer.style.display === "none") {
    console.log("hello");
    linkContainer.style.display = "block";
  } else {
    linkContainer.style.display = "none";
  }
  const header = getElementById("header");
  header.append(linkContainer);
};

const renderContent = (memo = { name: "", content: "" }) => {
  const oldContent = document.getElementById("content");
  const oldLabel = document.getElementById("label");
  if (oldContent) {
    app.removeChild(oldContent);
    app.removeChild(oldLabel);
  }
  const label = document.createElement("h1");
  label.setAttribute("id", "label");
  label.append(memo.name);
  app.appendChild(label);

  const content = document.createElement("div");
  content.setAttribute("id", "content");
  content.innerHTML = marked(memo.content);
  app.appendChild(content);
};

const getMemosJson = async () => {
  const memosJson = await fetch(`./memos.json`).then((response) =>
    response.text()
  );
  return JSON.parse(memosJson);
};

main();
