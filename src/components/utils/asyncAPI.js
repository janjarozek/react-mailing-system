// const API_URL = "https://srapi.herokuapp.com/v1/";
// const API_URL = process.env.API_URL;
// const API_URL = `${process.env.API_URL}/${process.env.API_TABLE_SUBS}?api_key=${process.env.API_KEY}`;
// const API_URL = `${process.env.API_URL}/${process.env.API_TABLE_SUBS}`;
const API_URL = `${process.env.API_URL}/`;

const request = async (endpoint, method = "GET", data = null) => {
  const config = {
    method,
    headers: {
      "Content-Type": "application/JSON",
      Authorization: `Bearer ${process.env.API_KEY}`,
      api_key: process.env.API_KEY
    }
  };

  if (method === "POST" || method === "PATCH") {
    config.body = JSON.stringify(data);
  }

  const url = `${API_URL}${endpoint}`;
  const res = await fetch(url, config);
  if (res.ok) {
    return await res.json();
  } else {
    console.log("bad communication with server");
  }
};

function get(endpoint) {
  return request(endpoint);
}
function post(endpoint, data) {
  return request(endpoint, "POST", data);
}
function patch(endpoint, data) {
  return request(endpoint, "PATCH", data);
}
function _delete(endpoint) {
  return request(endpoint, "DELETE");
}

export default {
  get,
  post,
  patch,
  delete: _delete
};
