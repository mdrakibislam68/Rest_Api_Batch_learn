const CLASS_THIRD_STEP = "CLASS_THIRD_STEP";

const initialState = {
  value: false,
};
export const thirdStepAction = (value) => {
  return {
    type: CLASS_THIRD_STEP,
    payload: value,
  };
};
export const thirdClassRedu = (state = initialState, action) => {
  switch (action.type) {
    case CLASS_THIRD_STEP:
      return {
        value: action.payload,
      };
    default:
      return state;
  }
};

export default thirdClassRedu;
