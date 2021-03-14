const app = document.getElementById("app");
let memos = [];

const main = async () => {
  memos = (await getMemosJson()) || [];
  renderHeader();
  renderNavs();
  renderContent();
};

const renderNavs = async () => {
  const navs = document.createElement("div");
  navs.setAttribute("class", "navs");
  app.appendChild(navs);

  memos.forEach((memo) => {
    const button = document.createElement("button");
    button.setAttribute("onClick", `onClickMemoButton('${memo.name}')`);
    button.append(memo.name);
    navs.appendChild(button);
  });
};

const onClickMemoButton = (name = "") => {
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
