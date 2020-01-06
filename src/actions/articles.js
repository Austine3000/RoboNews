export const getArticlesList = async page => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const response = await fetch(
      `http://5e0df4b536b80000143db9ca.mockapi.io/etranzact/v1/article?page=${page}&limit=10`,
      options
    );
    const json = await response.json();
    // console.log(json)
    return json;
  } catch (err) {
    console.log("Error getting documents", err);
  }
};

export const PostArticle = async payload => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  };
  try {
    const response = await fetch(
      `http://5e0df4b536b80000143db9ca.mockapi.io/etranzact/v1/article/`,
      options
    );
    const json = await response.json();
    // console.log(json)
    return json;
  } catch (err) {
    alert("Error posting documents", err);
  }
};

export const GetArticle = async id => {
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

export const EditArticle = async (payload, id) => {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
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
    alert("Error posting documents", err);
  }
};
