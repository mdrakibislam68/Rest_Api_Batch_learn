const ERASE_FORM = "ERASE_FORM";

const initialState = {
  value: "",
};
export const secondStepAction = (value) => {
  return {
    type: ERASE_FORM,
    payload: value,
  };
};
export const eraseFormRedu = (state = initialState, action) => {
  switch (action.type) {
    case ERASE_FORM:
      return {
        value: action.payload,
      };
    default:
      return state;
  }
};

export default eraseFormRedu;
