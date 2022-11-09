const MODAL_CHANGER = "MODAL_CHANGER";

const initialState = {
  value: false,
};
export const changeModalAction = (value) => {
  return {
    type: MODAL_CHANGER,
    payload: value,
  };
};
export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case MODAL_CHANGER:
      return {
        value: action.payload,
      };
    default:
      return state;
  }
};

export default modalReducer;
