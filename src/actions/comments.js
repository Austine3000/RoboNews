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
    console.log("Error getting documents", err);
  }
};
