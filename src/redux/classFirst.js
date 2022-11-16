const CLASS_FIRST_STEP = "CLASS_FIRST_STEP";

const initialState = {
  value: false,
};
export const firstStepAction = (value) => {
  return {
    type: CLASS_FIRST_STEP,
    payload: value,
  };
};
export const firstClassRedu = (state = initialState, action) => {
  switch (action.type) {
    case CLASS_FIRST_STEP:
      return {
        value: action.payload,
      };
    default:
      return state;
  }
};

export default firstClassRedu;
