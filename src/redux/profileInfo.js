import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  studentData: [],
  isError: "",
};

export const studentDataSlice = createAsyncThunk(
  "student/data",
  async ({ baseurl }, { rejectWithValue }) => {
    try {
      const response = await baseurl.get("auth/profile_info/");
      if (response.data) {
        // console.log(response.data);

        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const studentInfoData = createSlice({
  name: "studentData",
  initialState,
  reducers: {},

  extraReducers: {
    [studentDataSlice.pending]: (state) => {
      state.isLoading = true;
    },
    [studentDataSlice.fulfilled]: (state, action) => {
      state.studentData = action.payload;
      state.isLoading = false;
    },
    [studentDataSlice.rejected]: (state, action) => {
      state.isError = action.payload;
      state.isLoading = false;
    },
  },
});

export default studentInfoData.reducer;
