export const GetComments = async id => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const response = await fetch(
      `http://5e0df4b536b80000143db9ca.mockapi.io/etranzact/v1/article/` +
        id +
        `/comments`,
      options
    );
    const json = await response.json();
    // console.log(json)
    return json;
  } catch (err) {
    return err;
  }
};

export const GetSingleComment = async (id, commentId) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const response = await fetch(
      `http://5e0df4b536b80000143db9ca.mockapi.io/etranzact/v1/article/` +
        id +
        `/comments/` +
        commentId,
      options
    );
    const json = await response.json();
    // console.log(json)
    return json;
  } catch (err) {
    return err;
  }
};

export const PostComment = async (payload, id) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  };
  try {
    const response = await fetch(
      `http://5e0df4b536b80000143db9ca.mockapi.io/etranzact/v1/article/` +
        id +
        `/comments`,
      options
    );
    const json = await response.json();
    // console.log(json)
    return json;
  } catch (err) {
    return err;
  }
};

export const EditComment = async (payload, id, commentId) => {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  };
  try {
    const response = await fetch(
      `http://5e0df4b536b80000143db9ca.mockapi.io/etranzact/v1/article/` +
        id +
        `/comments/` +
        commentId,
      options
    );
    const json = await response.json();
    // console.log(json)
    return json;
  } catch (err) {
    return err;
  }
};

export const DeleteComment = async (id, commentId) => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const response = await fetch(
      `http://5e0df4b536b80000143db9ca.mockapi.io/etranzact/v1/article/` +
        id +
        `/comments/` +
        commentId,
      options
    );
    const json = await response.json();
    // console.log(json)
    return json;
  } catch (err) {
    return err;
  }
};
