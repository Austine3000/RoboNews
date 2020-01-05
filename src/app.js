const app = async () => {
  const header = null || document.getElementById("header_container");
  const content = null || document.getElementById("page_container");

  header.innerHTML = "Robo News";

  content.innerHTML = "All News";
};

window.addEventListener("hashchange", app);

window.addEventListener("load", app);
