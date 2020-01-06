let getArticlesList = async () => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const response = await fetch(
      `http://5e0df4b536b80000143db9ca.mockapi.io/etranzact/v1/article`,
      options
    );
    const json = await response.json();
    // console.log(json)
    return json;
  } catch (err) {
    console.log("Error getting documents", err);
  }
};

let Home = {
  render: async () => {
    let articles = await getArticlesList();
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
            </section>
        `;
    return view;
  },
  after_render: async () => {}
};

export default Home;
