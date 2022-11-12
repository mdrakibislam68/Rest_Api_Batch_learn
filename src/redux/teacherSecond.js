const SECOND = "SECOND";
const initialState = {
  value: [],
};
export const teacherSecondValue = (value) => {
  return {
    type: SECOND,
    payload: value,
  };
};
export const secondValueReducer = (state = initialState, action) => {
  switch (action.type) {
    case SECOND:
      return {
        value: action.payload,
      };
    default:
      return state;
  }
};
export default secondValueReducer;
