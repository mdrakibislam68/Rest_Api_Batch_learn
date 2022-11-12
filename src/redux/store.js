import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../redux/counterSlice";
import studentInfoSlice from "../redux/profileInfo";
import modalReducer from "./classModal";
import firstValueReducer from "./teacherFirst";
import secondValueReducer from "./teacherSecond";

export default configureStore({
  reducer: {
    counterDecrement: counterReducer,
    addSubjectFilterData: studentInfoSlice,
    studentData: studentInfoSlice,
    openModal: modalReducer,
    first: firstValueReducer,
    second: secondValueReducer,
  },
});
