const CLASS_SECOND_STEP = "CLASS_SECOND_STEP";

const initialState = {
  value: false,
};
export const secondStepAction = (value) => {
  return {
    type: CLASS_SECOND_STEP,
    payload: value,
  };
};
export const secondClassRedu = (state = initialState, action) => {
  switch (action.type) {
    case CLASS_SECOND_STEP:
      return {
        value: action.payload,
      };
    default:
      return state;
  }
};

export default secondClassRedu;
