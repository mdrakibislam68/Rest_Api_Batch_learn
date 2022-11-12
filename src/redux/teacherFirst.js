const FIRST = "FIRST";
const initialState = {
  value: [],
};
export const teacherFirstValue = (value) => {
  return {
    type: FIRST,
    payload: value,
  };
};
export const firstValueReducer = (state = initialState, action) => {
  switch (action.type) {
    case FIRST:
      return {
        value: action.payload,
      };
    default:
      return state;
  }
};
export default firstValueReducer;
