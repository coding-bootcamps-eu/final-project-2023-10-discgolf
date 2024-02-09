import GeneralHandler from "./GeneralHandler.js";

const HolePlayResultExtendedHandler = {
  endpoint: "holeplayresultsextended",
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
};

export default HolePlayResultExtendedHandler;
