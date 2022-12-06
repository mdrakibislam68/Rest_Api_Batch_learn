const CLICK_DATE = "CLICK_DATE";

const initialState = {
  value: "",
};
export const dateAction = (value) => {
  return {
    type: CLICK_DATE,
    payload: value,
  };
};
export const dateReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLICK_DATE:
      return {
        value: action.payload,
      };
    default:
      return state;
  }
};

export default dateReducer;
