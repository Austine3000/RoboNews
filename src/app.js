import Navbar from "./views/components/Navbar.js";

const app = async () => {
  const header = null || document.getElementById("header_container");
  const content = null || document.getElementById("page_container");

  header.innerHTML = await Navbar.render();
  await Navbar.after_render();
  content.innerHTML = "All News";
};

window.addEventListener("hashchange", app);

window.addEventListener("load", app);
