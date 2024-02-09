import GeneralHandler from "./GeneralHandler.js";

const UserHandler = {
  endpoint: "users",
  getAll: async function () {
    const result = await GeneralHandler.getAll(this.endpoint);
    return result;
  },

  getById: async function (id) {
    const result = await GeneralHandler.getById(this.endpoint, id);
    return result;
  },

  insert: async function (newData) {
    const result = await GeneralHandler.insert(this.endpoint, newData);
    return result;
  },

  getAllActive: async function () {
    const result = await GeneralHandler.getByKeyValueFilter(
      this.endpoint,
      "active",
      true
    );
    return result;
  },

  deleteById: async function (id) {
    const result = await GeneralHandler.deleteById(this.endpoint, id);
    return result;
  },
};

export default UserHandler;
