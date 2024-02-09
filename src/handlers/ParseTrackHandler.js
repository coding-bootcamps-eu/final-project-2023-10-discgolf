import TrackHandler from "./TrackHandler.js";
import CourseHandler from "./CourseHandler.js";
import CourseHoleHandler from "./CourseHoleHandler.js";

const ParseTrackHandler = {
  generateCoursesAndHolesFromNested: async function () {
    //await CourseHandler.deleteAll();
    //await CourseHoleHandler.deleteAll();

    const tracks = await TrackHandler.getAll();
    for (let trackIndex = 0; trackIndex < tracks.length; trackIndex++) {
      const track = tracks[trackIndex];
      const nestedCoursesObject = track.courses;
      await this.generateCoursesFromNested(track.id, nestedCoursesObject);
    }
  },
  generateCoursesFromNested: async function (trackId, nestedCoursesObject) {
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
    for (let index = 0; index < nestedCourseHoleArray.length; index++) {
      const nestedCourseHole = nestedCourseHoleArray[index];

      //deep copy
      const newCourseHole = JSON.parse(JSON.stringify(nestedCourseHole));

      newCourseHole.courseId = courseId;
      newCourseHole.sortNumber = index + 1; //sort number within course
      await CourseHoleHandler.insert(newCourseHole);
    }
  },
};
export default ParseTrackHandler;
