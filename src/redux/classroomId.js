const CLASS_ROOM_ID = "CLASS_ROOM_ID";

const initialState = {
  value: null,
};
export const classIdAction = (value) => {
  return {
    type: CLASS_ROOM_ID,
    payload: value,
  };
};
export const classIdRedu = (state = initialState, action) => {
  switch (action.type) {
    case CLASS_ROOM_ID:
      return {
        value: action.payload,
      };
    default:
      return state;
  }
};

export default classIdRedu;
