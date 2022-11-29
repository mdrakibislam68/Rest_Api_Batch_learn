import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../redux/counterSlice";
import studentInfoSlice from "../redux/profileInfo";
import studentInfoReducer from "../redux/profileInfo";
import modalReducer from "./classModal";
import getSubjects from "../redux/subjects";
import firstValueReducer from "./teacherFirst";
import secondValueReducer from "./teacherSecond";
import firstClassRedu from "./classFirst";
import secondClassRedu from "./classSecond";
import thirdClassRedu from "./classThird";
import newClassRedu from "./newClass";
import classIdRedu from "./classroomId";
import commentReducer from "./comment";

export default configureStore({
  reducer: {
    counterDecrement: counterReducer,
    addSubjectFilterData: studentInfoSlice,
    studentData: studentInfoSlice,
    openModal: modalReducer,
    first: firstValueReducer,
    second: secondValueReducer,
    subjects: getSubjects,
    firstClass: firstClassRedu,
    secondClass: secondClassRedu,
    thirdClass: thirdClassRedu,
    setNewClass: newClassRedu,
    classId: classIdRedu,
    profile: studentInfoReducer,
    comment: commentReducer,
  },
});
