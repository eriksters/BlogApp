import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getEnvVars from "../environment";
import { getBlogPosts as API_getBlogPosts } from "../API/BlogPostEndpoint";

export const refresh = createAsyncThunk(
  "blogPosts/refresh",
  async (query, thunkAPI) => {
    console.log("Refreshing");
    try {
      return await API_getBlogPosts(query.sortBy, query.filters, 1);
    } catch (err) {
      if (err.response) {
        return thunkAPI.rejectWithValue({ errors: err.response.errors });
      } else {
        return thunkAPI.rejectWithValue({
          errors: ["Problem with network. Are you connected to the internet?"],
        });
      }
    }
  }
);

const initialState = {
  errors: [],
  data: [],
  loadingMore: false,
  refreshing: false,
  saving: false,
  endReached: false,
};

const slice = createSlice({
  name: "blogPosts",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    //  Refresh
    builder.addCase(refresh.pending, (state) => {
      state.errors = [];
      state.refreshing = true;
      state.endReached = false;
    });
    builder.addCase(refresh.fulfilled, (state, action) => {
      state.errors = [];
      state.refreshing = false;
      state.data = action.payload;
      if (action.payload.length < 10) state.endReached = true;
    });
    builder.addCase(refresh.rejected, (state, action) => {
      state.errors = action.payload.errors;
      state.refreshing = false;
    });
  },
});

// export const {} = slice.actions;

export default reducer = slice.reducer;
