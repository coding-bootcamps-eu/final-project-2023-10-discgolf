import GeneralHandler from "./GeneralHandler.js";

const CourseHoleHandler = {
  endpoint: "courseholes",
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

  getByCourseIdAndSortNumber: async function (courseId, sortNumber) {
    const result = await GeneralHandler.getByTwoKeyValueFilters(
      this.endpoint,
      "courseId",
      courseId,
      "sortNumber",
      sortNumber
    );
    return result;
  },
  deleteById: async function (id) {
    const result = await GeneralHandler.deleteById(this.endpoint, id);
    return result;
  },

  deleteAll: async function () {
    const courseHoles = await this.getAll();
    for (let courseHole of courseHoles) {
      await this.deleteById(courseHole.id);
    }
  },
};

export default CourseHoleHandler;
