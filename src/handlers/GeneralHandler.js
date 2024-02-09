import { API_URL } from "../main.js";
const GeneralHandler = {
  getAll: async function (endpoint) {
    const response = await fetch(`${API_URL}/${endpoint}`);
    const data = await response.json();
    return data;
  },

  getById: async function (endpoint, id) {
    const response = await fetch(`${API_URL}/${endpoint}/${id}`);
    const data = await response.json();
    return data;
  },

  getAllSortDescByKey: async function (endpoint, key) {
    const response = await fetch(`${API_URL}/${endpoint}?_sort=-${key}`);
    const data = await response.json();
    return data;
  },

  getByKeyValueFilter: async function (endpoint, key, value) {
    const response = await fetch(`${API_URL}/${endpoint}?${key}=${value}`);
    const data = await response.json();
    return data;
  },

  getByTwoKeyValueFilters: async function (
    endpoint,
    key1,
    value1,
    key2,
    value2
  ) {
    const response = await fetch(
      `${API_URL}/${endpoint}?${key1}=${value1}&${key2}=${value2}`
    );
    const data = await response.json();
    return data;
  },

  insert: async function (endpoint, newData) {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    });
    const responseData = await response.json();
    return responseData;
  },

  updateById: async function (endpoint, id, updatedData) {
    const response = await fetch(`${API_URL}/${endpoint}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
    const responseData = await response.json();
    return responseData;
  },

  deleteById: async function (endpoint, id) {
    const response = await fetch(`${API_URL}/${endpoint}/${id}`, {
      method: "DELETE",
    });
    const responseData = await response.json();
    return responseData;
  },
};
export default GeneralHandler;
