import RoundHandler from "./RoundHandler.js";
import UserRoundPlayHandler from "./UserRoundPlayHandler.js";
import UserHandler from "./UserHandler.js";
import CourseHandler from "./CourseHandler.js";
import CourseHoleHandler from "./CourseHoleHandler.js";
import HolePlayResultHandler from "./HolePlayResultHandler.js";
import HolePlayResultExtendedHandler from "./HolePlayResultExtendedHandler.js";

const ResultHandler = {
  generateRound: async function () {
    let oldMaxRoundNumber = 0;
    const roundsDescByRoundNumber =
      await RoundHandler.getAllSortDescByRoundNumber();
    if (roundsDescByRoundNumber && roundsDescByRoundNumber.length > 0) {
      const lastRound = roundsDescByRoundNumber[0];
      oldMaxRoundNumber = lastRound.roundNumber;
    }
    const newRound = {};
    newRound.roundNumber = oldMaxRoundNumber + 1;
    let date = new Date().toJSON();
    newRound.date = date.slice(0, 10);
    const insertedRound = await RoundHandler.insert(newRound);
    this.holePlayResultExtendedTemplate = {};
    this.holePlayResultExtendedTemplate.roundId = insertedRound.id;
    this.holePlayResultExtendedTemplate.roundNumber = insertedRound.roundNumber;
    this.holePlayResultExtendedTemplate.roundDate = insertedRound.date;

    await this.generateUserRoundPlays(insertedRound.id);
  },
  generateUserRoundPlays: async function (roundId) {
    const activeUsers = await UserHandler.getAllActive();
    for (const activeUser of activeUsers) {
      const newUserRoundPlay = {};
      newUserRoundPlay.roundId = roundId;
      newUserRoundPlay.userId = activeUser.id;
      const insertedUserRoundPlay = await UserRoundPlayHandler.insert(
        newUserRoundPlay
      );
      this.holePlayResultExtendedTemplate.userRoundPlayId =
        insertedUserRoundPlay.id;
      this.holePlayResultExtendedTemplate.userId = insertedUserRoundPlay.userId;
      this.holePlayResultExtendedTemplate.userName = activeUser.name;

      await this.generateHolePlayResults(activeUser, insertedUserRoundPlay.id);
    }
  },
  generateHolePlayResults: async function (user, userRoundPlayId) {
    const courseName = this.findPropertyNotNormal(user);
    const courses = await CourseHandler.getByName(courseName);
    const course = courses[0];
    const userResults = user[courseName];
    this.holePlayResultExtendedTemplate.trackId = course.trackId;
    this.holePlayResultExtendedTemplate.courseId = course.id;
    this.holePlayResultExtendedTemplate.courseName = course.name;

    for (let index = 0; index < userResults.length; index++) {
      const userResult = userResults[index];
      const sortNumber = index + 1;
      const courseHoles = await CourseHoleHandler.getByCourseIdAndSortNumber(
        course.id,
        sortNumber
      );
      const courseHole = courseHoles[0];
      this.holePlayResultExtendedTemplate.courseHoleId = courseHole.id;
      this.holePlayResultExtendedTemplate.courseSortNumber =
        courseHole.sortNumber;
      this.holePlayResultExtendedTemplate.courseHoleTitle = courseHole.title;

      const newHolePlayResult = {};
      newHolePlayResult.courseHoleId = courseHole.id;
      newHolePlayResult.userRoundPlayId = userRoundPlayId;
      newHolePlayResult.throwCount = userResult;
      const insertedHolePlayResult = await HolePlayResultHandler.insert(
        newHolePlayResult
      );
      this.holePlayResultExtendedTemplate.holePlayResultId =
        insertedHolePlayResult.id;
      this.holePlayResultExtendedTemplate.throwCount =
        insertedHolePlayResult.throwCount;
      HolePlayResultExtendedHandler.insert(this.holePlayResultExtendedTemplate);
    }
  },
  findPropertyNotNormal: function (user) {
    let result;
    const normalProperties = ["name", "active", "id", "useDarkMode"];
    for (const key in user) {
      if (normalProperties.indexOf(key) === -1) {
        result = key;
      }
    }
    return result;
  },
};
export default ResultHandler;
