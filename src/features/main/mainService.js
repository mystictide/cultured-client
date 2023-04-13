import axios from "axios";
import { storeWithDate } from "../../assets/js/helpers";

const API_URL = "http://localhost:7474/main/";
// const API_URL = "https://capi.herrguller.cc/main/";
const secret = import.meta.env.VITE_SECRET;

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

const charactersByCategory = async (reqData) => {
  var config = {
    method: "get",
    url: API_URL + "get/characters?category=" + reqData.category,
    headers: {
      Authorization: "Bearer " + secret,
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

const mainService = {
  getCategories,
  charactersByCategory,
};

export default mainService;
