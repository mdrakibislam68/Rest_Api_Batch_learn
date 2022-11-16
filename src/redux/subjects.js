import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  subjects: [],
  isError: "",
};

export const subjectAction = createAsyncThunk(
  "subjects/data",
  async ({ baseurl }, { reject }) => {
    try {
      const response = await baseurl.get("settings/get_subjects");
      if (response.data) {
        return response.data;
      }
    } catch (err) {
      return reject(err.message);
    }
  }
);

export const subjectReducer = createSlice({
  name: "subjects",
  initialState,
  reducers: {},

  extraReducers: {
    [subjectAction.pending]: (state, action) => {
      state.isLoading = true;
    },
    [subjectAction.fulfilled]: (state, action) => {
      state.subjects = action.payload;
      state.isLoading = false;
    },
    [subjectAction.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },
  },
});

export default subjectReducer.reducer;
