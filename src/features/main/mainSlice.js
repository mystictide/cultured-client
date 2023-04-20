import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import mainService from "./mainService";

const initialState = {
  categories: null,
  characters: null,
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

export const getCharacter = createAsyncThunk(
  "main/getCharacter",
  async (reqData, thunkAPI) => {
    try {
      const response = await mainService.getCharacter(reqData);
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

export const characterByCategory = createAsyncThunk(
  "main/characterByCategory",
  async (reqData, thunkAPI) => {
    try {
      const response = await mainService.characterByCategory(reqData);
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

export const filterCharacters = createAsyncThunk(
  "main/filterCharacters",
  async (reqData, thunkAPI) => {
    try {
      const response = await mainService.filterCharacters(reqData);
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
    },
    resetCharacters: (state) => {
      localStorage.removeItem("characters");
      state.characters = null;
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
      .addCase(getCharacter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCharacter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.character = action.payload;
      })
      .addCase(getCharacter.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = null;
        state.character = null;
      })
      .addCase(characterByCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(characterByCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.characters = action.payload;
      })
      .addCase(characterByCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = null;
        state.characters = null;
      })
      .addCase(filterCharacters.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(filterCharacters.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.characters = action.payload;
      })
      .addCase(filterCharacters.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = null;
        state.characters = null;
      });
  },
});

export const { reset, resetCharacters } = mainSlice.actions;
export default mainSlice.reducer;
