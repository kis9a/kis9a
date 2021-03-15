const app = document.getElementById("app");
let memos = [];

const main = async () => {
  memos = (await getMemosJson()) || [];
  renderHeader();
  renderLinks();
  renderContent();
};

const renderLinks = async () => {
  const linkContainer = document.createElement("div");
  linkContainer.setAttribute("div", "link-container");

  const linkSearch = document.createElement("input");
  linkSearch.setAttribute("id", "link-search");
  linkSearch.setAttribute("placeholder", "Search index");
  linkContainer.appendChild(linkSearch);

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
  header.setAttribute("class", "header");
  app.appendChild(header);

  const headerLink = document.createElement("a");
  headerLink.setAttribute("href", "/kis9a");
  headerLink.append("HOME");
  header.appendChild(headerLink);

  // TODO search memo content string
  // const memoSearch = document.createElement("input");
  // memoSearch.setAttribute("type", "text");
  // memoSearch.setAttribute("id", "memo-search");
  // header.appendChild(memoSearch);
};

const renderContent = (memo = { name: "", content: "" }) => {
  const oldContent = document.getElementById("content");
  if (oldContent) {
    app.removeChild(oldContent);
  }
  const content = document.createElement("div");
  content.setAttribute("id", "content");
  content.innerHTML = marked(memo.content);

  const label = document.createElement("h1");
  label.setAttribute("id", "label");
  content.appendChild(label);
  app.appendChild(content);
};

const getMemosJson = async () => {
  const memosJson = await fetch(`./memos.json`).then((response) =>
    response.text()
  );
  return JSON.parse(memosJson);
};

main();
