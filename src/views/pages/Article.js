import Utils from "./../../services/Utils.js";

let getArticle = async id => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const response = await fetch(
      `http://5e0df4b536b80000143db9ca.mockapi.io/etranzact/v1/article/` + id,
      options
    );
    const json = await response.json();
    // console.log(json)
    return json;
  } catch (err) {
    console.log("Error getting documents", err);
  }
};

let Article = {
  render: async () => {
    let request = Utils.parseRequestURL();
    let article = await getArticle(request.id);

    return /*html*/ `
            <section class="section">
                <p> Post Title : ${article.title} </p>
                <p> Post Content : ${article.avatar} </p>
                <p> Post Author : ${article.url} </p>
            </section>
        `;
  },
  after_render: async () => {}
};

export default Article;
