const app = document.getElementById("app");

const main = () => {
  renderHeader();
  renderContent();
  readFile();
};

const renderHeader = () => {
  const header = document.createElement("div");
  header.setAttribute("class", "header");
  app.appendChild(header);

  const headerLink = document.createElement("a");
  headerLink.setAttribute("href", "/");
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

const readFile = async () => {
  let code = await fetch(`../../memos/go.md`).then((response) =>
    response.text()
  );
  console.log(code);
};

main();
