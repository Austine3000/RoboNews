import { getArticlesList } from "../../actions/articles.js";

let Home = {
  name: "new",
  render: async articlesList => {
    const page = 1;
    const articles = articlesList ? articlesList : await getArticlesList(page);

    let view = /*html*/ `
            <section class="section">
                <h1> Home </h1>
                <ul>
                    ${articles
                      .map(
                        article => /*html*/ `
                            <li>
                              <a href="#/article/${article.id}">${article.title}</a>
                                 <a class="button is-primary" href="#/edit-article/${article.id}">
                                    <strong>Edit</strong>
                                </a>
                            </li>
                          
                          `
                      )
                      .join("\n ")}
                </ul>
                <div>
                  <button class="button" id="prev_btn" >
                    <strong>Prev</strong>
                  </button>
                  <button class="button is-primary" id="next_btn">
                    <strong>Next</strong>
                  </button>
                </div>
            </section>
        `;
    return view;
  },
  after_render: async pageNo => {
    let page = pageNo ? pageNo : 1;
    if (page === 1) {
      document.getElementById("prev_btn").disabled = true;
    }
    const content = null || document.getElementById("page_container");
    document.getElementById("prev_btn").addEventListener("click", async () => {
      page = page - 1;
      const articles = await getArticlesList(page);
      content.innerHTML = await Home.render(articles);
      await Home.after_render(page);
    });

    document.getElementById("next_btn").addEventListener("click", async () => {
      page = page + 1;
      const articles = await getArticlesList(page);
      if (articles.length > 0) {
        content.innerHTML = await Home.render(articles);
        await Home.after_render(page);
      } else {
        document.getElementById("next_btn").disabled = true;
      }
     
    });
  }
};

export default Home;
