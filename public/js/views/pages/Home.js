import { getArticlesList } from "../../actions/articles.js";

let Home = {
  name: "new",
  render: async articlesList => {
    const page = 1;
    const articles = articlesList ? articlesList : await getArticlesList(page);

    let view = /*html*/ `
            <section class="section">
                <div class="article-action-bar shift-end">
                  <a class="btn-link btn btn-primary" href="#/create-article">
                      New Article
                  </a>
                </div>
                <div>
                  <ul>
                      ${articles
                        .map(
                          article => /*html*/ `
                              <li>
                                <div class="card">
                                  <h3 class="article-title"><a href="#/article/${
                                    article.id
                                  }">${article.title}</a></h3>
                                  <span> by ${
                                    article.author
                                      ? ` ${article.author}`
                                      : "anonymous"
                                  }</span>
                                  <div class="article-action-bar">
                                    <a class="btn-link btn btn-warning" href="#/edit-article/${
                                      article.id
                                    }">
                                        Edit
                                    </a>
                                  </div>
                                </div>
                              </li>
                            
                            `
                        )
                        .join("\n ")}
                  </ul>
                </div>
                <div class="pagination-box">
                  <button class="btn" id="prev_btn" >
                    Prev
                  </button>
                  <button class="btn btn-primary" id="next_btn">
                    Next
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
