const NEW_CLASS = "NEW_CLASS";

const initialState = {
  value: false,
};
export const newClassAction = (value) => {
  return {
    type: NEW_CLASS,
    payload: value,
  };
};
export const newClassRedu = (state = initialState, action) => {
  switch (action.type) {
    case NEW_CLASS:
      return {
        value: action.payload,
      };
    default:
      return state;
  }
};

export default newClassRedu;
