import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getWithDate } from "../../assets/js/helpers";
import mainService from "./mainService";

const categories = JSON.parse(getWithDate("categories"));

const initialState = {
  categories: categories ? categories : null,
  character: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
};

export const getCategories = createAsyncThunk(
  "main/getCategories",
  async (reqData, thunkAPI) => {
    try {
      const response = await mainService.getCategories(reqData);
      if (response.status === 500) {
        return thunkAPI.rejectWithValue(response);
      }
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const charactersByCategory = createAsyncThunk(
  "main/charactersByCategory",
  async (reqData, thunkAPI) => {
    try {
      const response = await mainService.charactersByCategory(reqData);
      if (response.status === 500) {
        return thunkAPI.rejectWithValue(response);
      }
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.character = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = null;
        state.categories = null;
      })
      .addCase(charactersByCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(charactersByCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.character = action.payload;
      })
      .addCase(charactersByCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = null;
        state.character = null;
      });
  },
});

export const { reset } = mainSlice.actions;
export default mainSlice.reducer;
