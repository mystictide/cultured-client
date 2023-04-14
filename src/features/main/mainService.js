import axios from "axios";
import { storeWithDate } from "../../assets/js/helpers";

const API_URL = "http://localhost:7474/main/";
// const API_URL = "https://capi.herrguller.cc/main/";

const getCategories = async (reqData) => {
  var config = {
    method: "get",
    url:
      API_URL +
      "get/categories?main=" +
      reqData.main +
      "&parentid=" +
      reqData.parentid,
  };

  var data = await axios(config)
    .then(function (response) {
      storeWithDate("categories", JSON.stringify(response.data), 2);
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
    url: API_URL + "get/character?category=" + reqData.category,
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
      storeWithDate("characters", JSON.stringify(response.data), 1);
      return response.data;
    })
    .catch(function (error) {
      return { data: error.response.data, status: error.response.status };
    });

  return data;
};

const mainService = {
  getCategories,
  characterByCategory,
  filterCharacters,
};

export default mainService;
