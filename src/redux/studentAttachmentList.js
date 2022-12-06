import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  isLoading: false,
  studentAttachment: {},
  studentAttachmentList: [],
  isError: "",
};

export const loadStudentAttachmentList = createAsyncThunk(
  "stuent-attachment/data",
  async ({ baseurl, url }, { rejectWithValue }) => {
    try {
      const response = await baseurl.get(url);
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const studentAttachListSlice = createSlice({
  name: "studentAttachList",
  initialState,
  reducers: {
    addNewAttach: (state, action) => {
      state.studentAttachmentList.push(action.payload);
    },
  },

  extraReducers: {
    [loadStudentAttachmentList.pending]: (state) => {
      state.isLoading = true;
    },

    [loadStudentAttachmentList.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.studentAttachment = payload;
      state.studentAttachmentList = payload.results;
    },

    [loadStudentAttachmentList.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },
  },
});

export const { addNewAttach } = studentAttachListSlice.actions;
export default studentAttachListSlice.reducer;
