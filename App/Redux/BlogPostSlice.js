import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getEnvVars from "../environment";
import {
  getBlogPosts as API_getBlogPosts,
  likeBlogPost as API_likeBlogPost,
  createBlogPost as API_createBlogPost,
} from "../API/BlogPostEndpoint";

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

export const loadMore = createAsyncThunk(
  "blogPosts/loadMore",
  async (query, thunkAPI) => {
    const state = thunkAPI.getState().blogPosts;
    if (!state.refreshing && !state.endReached) {
      console.log("Loading More");
      try {
        return await API_getBlogPosts(
          query.sortBy,
          query.filters,
          state.currentPage + 1
        );
      } catch (err) {
        console.log("rejecting\n", err);
        if (err.response) {
          return thunkAPI.rejectWithValue({ errors: err.response.errors });
        } else {
          return thunkAPI.rejectWithValue({
            errors: [
              "Problem with network. Are you connected to the internet?",
            ],
          });
        }
      }
    } else {
      return thunkAPI.rejectWithValue({
        errors: [],
      });
    }
  }
);

export const like = createAsyncThunk(
  "blogPosts/like",
  async (query, thunkAPI) => {
    console.log("Liking post thunk");
    try {
      return await API_likeBlogPost(query.postId);
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

export const create = createAsyncThunk(
  "blogPosts/create",
  async (query, thunkAPI) => {
    try {
      return await API_createBlogPost(
        query.title,
        query.description,
        query.content,
        query.thumbnailURL
      );
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
  currentPage: 1,
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
      state.data = action.payload.data;
      state.currentPage = action.payload.page;
      if (action.payload.data.length < 10) state.endReached = true;
    });
    builder.addCase(refresh.rejected, (state, action) => {
      state.errors = action.payload.errors;
      state.refreshing = false;
    });

    //  Load more
    builder.addCase(loadMore.pending, (state) => {
      state.errors = [];
      state.loadingMore = true;
    });
    builder.addCase(loadMore.fulfilled, (state, action) => {
      state.errors = [];
      state.loadingMore = false;
      state.data = [...state.data, ...action.payload.data];
      state.currentPage = action.payload.page;
      if (action.payload.data.length < 10) state.endReached = true;
    });
    builder.addCase(loadMore.rejected, (state, action) => {
      state.errors = action.payload.errors;
      state.loadingMore = false;
    });

    //  Like
    builder.addCase(like.pending, (state, action) => {
      state.errors = [];
      const post = state.data.find((val) => val._id === action.meta.arg.postId);
      post.likedByMe = true;
    });
    builder.addCase(like.fulfilled, (state, action) => {
      const returnedPost = action.payload.data;
      state.data = state.data.map((val) => {
        if (val._id.toString() === action.payload.data._id.toString()) {
          return returnedPost;
        } else {
          return val;
        }
      });
    });
    builder.addCase(like.rejected, (state, action) => {
      let post = state.data.find((val) => val._id === action.meta.arg.postId);
      post.likedByMe = false;
      state.errors = action.payload.errors;
    });

    //  Create
    builder.addCase(create.pending, (state) => {
      state.saving = true;
      state.errors = [];
      console.log("Pending");
    });
    builder.addCase(create.fulfilled, (state, action) => {
      state.saving = false;
      state.errors = [];
      console.log("Fulfilled");
    });
    builder.addCase(create.rejected, (state, action) => {
      state.saving = false;
      state.errors = action.payload.errors;
      console.log("Rejected");
    });
  },
});

// export const {} = slice.actions;

export default reducer = slice.reducer;
