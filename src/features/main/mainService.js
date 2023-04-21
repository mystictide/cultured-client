import axios from "axios";

// const API_URL = "http://localhost:7474/main/";
const API_URL = "https://capi.herrguller.cc/main/";

const getCategories = async (reqData) => {
  var config = {
    method: "get",
    url:
      API_URL +
      "get/categories?main=" +
      reqData.main +
      "&prev=" +
      reqData.prev +
      "&parentid=" +
      reqData.parentid,
  };

  var data = await axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return { data: error.response.data, status: error.response.status };
    });

  return data;
};

const getCharacter = async (reqData) => {
  let urlString = API_URL + "get/character?Name=" + reqData.Name;
  if (reqData.ID) {
    urlString += "&ID=" + reqData.ID;
  }
  var config = {
    method: "get",
    url: urlString,
  };

  var data = await axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return { data: error.response.data, status: error.response.status };
    });

  return data;
};

const characterByCategory = async (reqData) => {
  var config = {
    method: "get",
    url: API_URL + "get/character?Name=" + reqData.Name,
    headers: {
      "Content-Type": "application/json",
    },
  };

  var data = await axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return { data: error.response.data, status: error.response.status };
    });

  return data;
};

const filterCharacters = async (reqData) => {
  var config = {
    method: "post",
    url: API_URL + "filter/characters",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(reqData.filter),
  };
  var data = await axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return { data: error.response.data, status: error.response.status };
    });

  return data;
};

const mainService = {
  getCategories,
  getCharacter,
  characterByCategory,
  filterCharacters,
};

export default mainService;
