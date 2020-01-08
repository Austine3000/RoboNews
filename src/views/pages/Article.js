import Utils from "./../../services/Utils.js";
import { GetArticle, GetArticleImage } from "../../actions/articles.js";
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
    const images = await GetArticleImage(request.id);

    return /*html*/ `
            <section class="section">
              <div class="slider-container">
                ${images.map(
                  image => `
                <img class="mySlides" src=${image.avatar} style="width:100%">
                `
                )}
                <div class="centre-button">
                  <button class="btn" id="plusDivsMinus">&#10094;</button>
                  <button class="btn" id="plusDivsPlus">&#10095;</button>
                </div>
              </div>
                <div class="card style-card-items">
                  <div class="avatar-area">
                    <img src="${article.avatar}">
                  </div>
                  <div>
                    <h3 class="article-title">
                      <a href="${article.url}">${article.title}</a>
                    </h3>
                    <span> by ${
                      article.author ? ` ${article.author}` : "anonymous"
                    }</span>
                  </div> 
                </div>
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
                        <button class="btn btn-primary" id="submit_btn">
                          <div class="" id="loader-article">Submit</div> 
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
                              <button class="btn btn-warning edit_comment" value="${comment.id}" id="edit_comment_${comment.id}">
                                    <strong>Edit</strong>
                                </button>
                                <button class="btn btn-danger delete_comment" value="${comment.id}" id="delete_comment_${comment.id}">
                                    <strong>Delete</strong>
                              </button>
                            </li>
                          `
                      )
                      .join("\n ")}
                  </ul>

                  <div id="snackbar"></div>
                </section>
            </section>
        `;
  },
  after_render: async () => {
    const request = Utils.parseRequestURL();
    let update = false;
    let commentId;

    var slideIndex = 1;
    showDivs(slideIndex);

    function plusDivs(n) {
      showDivs((slideIndex += n));
    }

    function showDivs(n) {
      var i;
      var x = document.getElementsByClassName("mySlides");
      if (n > x.length) {
        slideIndex = 1;
      }
      if (n < 1) {
        slideIndex = x.length;
      }
      for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
      }
      x[slideIndex - 1].style.display = "block";
    }

    carousel();

    function carousel() {
      var i;
      var x = document.getElementsByClassName("mySlides");
      for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
      }
      slideIndex++;
      if (slideIndex > x.length) {
        slideIndex = 1;
      }
      x[slideIndex - 1].style.display = "block";
      setTimeout(carousel, 5000); // Change image every 2 seconds
    }

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

          document.getElementById("loader-article").classList.add("loader");
          document.getElementById("loader-article").innerHTML = "";

          try {
            const response = update
              ? await EditComment(payload, request.id, commentId)
              : await PostComment(payload, request.id);
            console.log(response);
            commentId = null;
            update = false;
            document.getElementById("name_input").value = "";
            document.getElementById("avatar_input").value = "";
            document.getElementById("comment_input").value = "";
            document
              .getElementById("loader-article")
              .classList.remove("loader");
            document.getElementById("loader-article").innerHTML = "Submit";
            let x = document.getElementById("snackbar");
            x.innerHTML = "Successfully submitted data";
            x.className = "show";
            setTimeout(function() {
              x.className = x.className.replace("show", "");
            }, 3000);
          } catch (err) {
            document
              .getElementById("loader-article")
              .classList.remove("loader");
            document.getElementById("loader-article").innerHTML = "Submit";
            let x = document.getElementById("snackbar");
            x.innerHTML = "Error occured while submitting";
            x.className = "show";
            setTimeout(function() {
              x.className = x.className.replace("show", "");
            }, 3000);
          }
        }
      });

    document.getElementById("plusDivsMinus").onclick = function() {
      plusDivs(-1);
    };

    document.getElementById("plusDivsPlus").onclick = function() {
      plusDivs(-1);
    };
  }
};

export default Article;
