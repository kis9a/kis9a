const app = document.getElementById("app");
let memos = [];

const main = async () => {
  memos = (await getMemosJson()) || [];
  renderHeader();
  renderContent();
  renderNavs();
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
  renderContent();
  console.log(name);
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

const renderContent = () => {
  const content = document.createElement("div");
  content.setAttribute("class", "content");
  content.innerHTML = marked(
    "# Marked in the browser\n\nRendered by **marked**."
  );
  app.appendChild(content);
};

const getMemosJson = async () => {
  const memosJson = await fetch(`./memos.json`).then((response) =>
    response.text()
  );
  return JSON.parse(memosJson);
};

main();
