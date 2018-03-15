const axios = require("axios");
const proxy = { proxy: { host: "127.0.0.1", port: 8081 } };

const fetchUser = name => {
  return axios
    .get(`http://localhost:8081/user?name=${name}`, proxy)
    .catch(err => console.log(err));
};

const addUser = (name, goal) => {
  return axios
    .post(`http://localhost:8081/user`, { name, goal }, proxy)
    .catch(err => console.log(err));
};

const updateGoal = (name, goal) => {
  return axios
    .post(`http://localhost:8081/message`, { name, goal }, proxy)
    .catch(err => console.log(err));
};

const fetchContent = goal => {
  return axios
    .post("https://shine-se-test-api.herokuapp.com/", { goal })
    .catch(err => console.log(err));
};


module.exports = {
  fetchUser,
  addUser,
  updateGoal,
  fetchContent
};
