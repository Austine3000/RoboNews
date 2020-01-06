import Utils from "./../../services/Utils.js";
import { GetArticle } from "../../actions/articles.js";
import {
  GetComments,
  PostComment,
  GetSingleComment,
  EditComment,
  DeleteComment
} from "../../actions/comments.js";

let Article = {
  render: async () => {
    const request = Utils.parseRequestURL();
    const article = await GetArticle(request.id);
    const comments = await GetComments(request.id);

    return /*html*/ `
            <section class="section">
                <p> Article Title : ${article.title} </p>
                <p> Article url : ${article.url} </p>
                <p> Article avatar : ${article.avatar} </p>
                <p> Article author : ${article.author} </p>
                <section>
                  <h3>Add comments</h3>
                  <div>
                      <p>
                        <input class="input" id="name_input" type="text" placeholder="Enter your name">
                      </p>
                  </div>
                  <div>
                      <p>
                        <input class="input" id="avatar_input" type="text" placeholder="Enter your avatar">
                      </p>
                  </div>
                  <div>
                      <p>
                        <textarea class="input" id="comment_input" type="text" placeholder="Enter your comment"></textarea>
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
                </section>
                  <h3>Comments</h3>
                    <ul>
                    ${comments
                      .map(
                        comment => /*html*/ `
                            <li>
                              <p>${comment.comment}</p>
                              <button class="edit_comment" value="${comment.id}" id="edit_comment_${comment.id}">
                                    <strong>Edit</strong>
                                </button>
                                <button class="button is-primary delete_comment" value="${comment.id}" id="delete_comment_${comment.id}">
                                    <strong>Delete</strong>
                              </button>
                            </li>
                          `
                      )
                      .join("\n ")}
                  </ul>
                </section>
            </section>
        `;
  },
  after_render: async () => {
    const request = Utils.parseRequestURL();
    let update = false;
    let commentId;

    document
      .getElementById("submit_btn")
      .addEventListener("click", async () => {
        const name = document.getElementById("name_input");
        const avatar = document.getElementById("avatar_input");
        const comment = document.getElementById("comment_input");

        if ((name.value == "") | (avatar.value == "") | (comment.value == "")) {
          alert(`The fields cannot be empty`);
        } else {
          const payload = {
            name: name.value,
            avatar: avatar.value,
            comment: comment.value
          };

          const response = update
            ? await EditComment(payload, request.id, commentId)
            : await PostComment(payload, request.id);

          if (response) {
            console.log("Success");

            let commentId = null;
            let update = false;
            document.getElementById("name_input").value = "";
            document.getElementById("avatar_input").value = "";
            document.getElementById("comment_input").value = "";
          }
        }
      });

    document.querySelectorAll(".edit_comment").forEach(el => {
      el.addEventListener("click", async () => {
        alert(el.value);

        commentId = el.value;
        update = true;

        const comment = await GetSingleComment(request.id, commentId);
        document.getElementById("name_input").value = comment.name || "";
        document.getElementById("avatar_input").value = comment.avatar || "";
        document.getElementById("comment_input").value = comment.comment || "";
      });
    });

    document.querySelectorAll(".delete_comment").forEach(el => {
      el.addEventListener("click", async () => {
        alert(el.value);

        await DeleteComment(request.id, el.value);
      });
    });
  }
};

export default Article;
