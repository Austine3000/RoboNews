import * as Article from "../../actions/articles.js";
import Utils from "./../../services/Utils.js";

let ArticleForm = {
  render: async () => {
    return /*html*/ `
            <section>
                <div>
                    <p>
                      <input class="input" id="author_input" type="text" placeholder="Enter your author">
                    </p>
                </div>
                <div>
                    <p>
                      <input class="input" id="title_input" type="text" placeholder="Enter your title">
                    </p>
                </div>
                <div>
                    <p>
                      <input class="input" id="avatar_input" type="text" placeholder="Enter a avatar">
                    </p>
                </div>
                 <div>
                    <p>
                      <input class="input" id="url_input" type="text" placeholder="Enter a url">
                    </p>
                </div>
                <div class="field">
                    <p class="control">
                        <button class="button is-primary" id="submit_btn">
                        Submit
                        </button>
                    </p>
                </div>

            </section>
        `;
  },
  // All the code related to DOM interactions and controls go in here.
  // This is a separate call as these can be registered only after the DOM has been painted
  after_render: async () => {
    let request = Utils.parseRequestURL();
    if (request.resource === "edit-article") {
      let article = await Article.GetArticle(request.id);
      document.getElementById("author_input").value = article.author || "";
      document.getElementById("title_input").value = article.title || "";
      document.getElementById("avatar_input").value = article.avatar || "";
      document.getElementById("url_input").value = article.url || "";
    }

    document
      .getElementById("submit_btn")
      .addEventListener("click", async () => {
        let author = document.getElementById("author_input");
        let title = document.getElementById("title_input");
        let avatar = document.getElementById("avatar_input");
        let url = document.getElementById("url_input");
        if (
          (author.value == "") |
          (title.value == "") |
          (avatar.value == "") |
          (url.value == "")
        ) {
          alert(`The fields cannot be empty`);
        } else {
          const payload = {
            author: author.value,
            title: title.value,
            avatar: avatar.value,
            url: url.value
          };

          let response =
            request.resource === "edit-article"
              ? await Article.EditArticle(payload, request.id)
              : await Article.PostArticle(payload);

          if (response) {
            console.log("Success");
          }
        }
      });
  }
};

export default ArticleForm;
