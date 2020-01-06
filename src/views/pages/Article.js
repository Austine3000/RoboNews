import Utils from "./../../services/Utils.js";
import { GetArticle } from "../../actions/articles.js";
import { GetComments } from "../../actions/comments.js";

let Article = {
  render: async () => {
    let request = Utils.parseRequestURL();
    let article = await GetArticle(request.id);
    let comments = await GetComments(request.id);

    return /*html*/ `
            <section class="section">
                <p> Post Title : ${article.title} </p>
                <p> Post Content : ${article.avatar} </p>
                <p> Post Author : ${article.url} </p>
                <h3>Comments</h3>
                   <ul>
                    ${comments
                      .map(
                        comment => /*html*/ `
                            <li>
                              <p>${comment.comment}</p>
                                 <a class="button is-primary" href="#/edit-/${comment.id}">
                                        <strong>Edit</strong>
                                    </a>
                                    <a class="button is-primary">
                                        <strong>Delete</strong>
                                    </a>
                            </li>
                          
                          `
                      )
                      .join("\n ")}
                </ul>
            </section>
        `;
  },
  after_render: async () => {}
};

export default Article;
