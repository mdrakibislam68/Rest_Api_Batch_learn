import { notification } from "antd";
const NON_FIELD = "MODAL_CHANGER";

const initialState = {
  value: false,
};
export const changeModalAction = (value) => {
  return {
    type: NON_FIELD,
    payload: value,
  };
};

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case NON_FIELD:
      return {
        value: action.payload,
      };
    default:
      return state;
  }
};

export default modalReducer;

const displayFormError = function (formRef, error) {
  if ("response" in error && error.code !== "ERR_BAD_RESPONSE") {
    const { data: errors } = error.response;

    if ("non_field_errors" in errors) {
    } else {
      const fieldsErrors = [];
      Object.entries(errors).forEach((entry) => {
        const [key, value] = entry;
        fieldsErrors.push({
          name: key,
          errors: value,
        });
      });
      formRef.setFields(fieldsErrors);
    }
  } else {
    notification["error"]({
      message: "Operation unsuccessful",
      description: error.message,
      placement: "topRight",
    });
  }
};
