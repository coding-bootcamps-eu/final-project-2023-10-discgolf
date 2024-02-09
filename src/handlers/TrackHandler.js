import GeneralHandler from "./GeneralHandler.js";
import CourseHandler from "./CourseHandler.js";
import CourseHoleHandler from "./CourseHoleHandler.js";

const TrackHandler = {
  endpoint: "tracks",
  getAll: async function () {
    const result = await GeneralHandler.getAll(this.endpoint);
    return result;
  },

  getById: async function (id) {
    const result = await GeneralHandler.getById(this.endpoint, id);
    return result;
  },

  generateCoursesAndHolesFromNested: async function () {
    const tracks = await this.getAll();
    for (let trackIndex = 0; trackIndex < tracks.length; trackIndex++) {
      const track = tracks[trackIndex];
      const nestedCoursesObject = track.Courses;
      await this.generateCoursesFromNested(track.trackId, nestedCoursesObject);
    }
  },
  generateCoursesFromNested: async function (trackId, nestedCoursesObject) {
    await CourseHandler.deleteAll();
    for (let key in nestedCoursesObject) {
      const newCourse = {};
      newCourse.trackId = trackId;
      newCourse.name = key;
      const insertedCourse = await CourseHandler.insert(newCourse);
      const nestedCourseHoleArray = nestedCoursesObject[key];
      await this.generateCourseHolesFromNested(
        insertedCourse.id,
        nestedCourseHoleArray
      );
    }
  },
  generateCourseHolesFromNested: async function (
    courseId,
    nestedCourseHoleArray
  ) {
    await CourseHoleHandler.deleteAll();
    for (let index = 0; index < nestedCourseHoleArray.length; index++) {
      const nestedCourseHole = nestedCourseHoleArray[index];

      //deep copy
      const newCourseHole = JSON.parse(JSON.stringify(nestedCourseHole));

      newCourseHole.courseId = courseId;
      newCourseHole.sortNumber = index + 1; //sort number within course
      await CourseHoleHandler.insert();
    }
  },
};
export default TrackHandler;
