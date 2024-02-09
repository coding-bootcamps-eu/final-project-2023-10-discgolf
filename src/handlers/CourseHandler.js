import GeneralHandler from "./GeneralHandler.js";

const CourseHandler = {
  endpoint: "courses",
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

  getByName: async function (name) {
    const result = await GeneralHandler.getByKeyValueFilter(
      this.endpoint,
      "name",
      name
    );
    return result;
  },

  deleteById: async function (id) {
    const result = await GeneralHandler.deleteById(this.endpoint, id);
    return result;
  },

  deleteAll: async function () {
    const courses = await this.getAll();
    for (let course of courses) {
      await this.deleteById(course.id);
    }
  },
};

export default CourseHandler;
