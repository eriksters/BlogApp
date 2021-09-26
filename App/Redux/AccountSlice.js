import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getEnvVars from "../environment";
import {
  signIn as API_signIn,
  signUp as API_signUp,
} from "../API/AccountEndpoint";

export const signUp = createAsyncThunk(
  "account/signUp",
  async ({ username, password, email }, thunkAPI) => {
    try {
      return await API_signUp(email, password, username);
    } catch (err) {
      if (err.response) {
        if (err.response.status === 400) {
          return thunkAPI.rejectWithValue(err.response.data);
        } else {
          return thunkAPI.rejectWithValue({
            errors: ["Problem on our end. Try again later."],
          });
        }
      }

      return thunkAPI.rejectWithValue({
        errors: ["Problem with network. Are you connected to the internet?"],
      });
    }
  }
);

export const signIn = createAsyncThunk(
  "account/signIn",
  async ({ email, password }, thunkAPI) => {
    try {
      return await API_signIn(email, password);
    } catch (err) {
      if (err.response) {
        return thunkAPI.rejectWithValue(err.response.data);
      } else {
        return thunkAPI.rejectWithValue({
          errors: ["Problem with network. Are you connected to the internet?"],
        });
      }
    }
  }
);

const slice = createSlice({
  name: "account",

  initialState: {
    errors: [],
    signInStatus: "none",
    loading: false,
    username: null,
    token: null,
    _id: null,
  },

  reducers: {
    signOut(state, action) {
      state.username = null;
      state.signInStatus = "none";
      state.token = null;
      state._id = null;
    },
    guestLogin(state, action) {
      console.log(state);
      state.username = "guest";
      state.signInStatus = "guest";
    },
  },

  extraReducers: (builder) => {
    //  Sign up
    builder.addCase(signUp.pending, (state) => {
      state.errors = [];
      state.loading = true;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.errors = [];
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.signInStatus = "SignedIn";
      state.loading = false;
      state._id = action.payload._id;
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.errors = action.payload.errors;
      state.loading = false;
    });

    //  Sign in
    builder.addCase(signIn.pending, (state) => {
      state.errors = [];
      state.loading = true;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.errors = [];
      state.username = action.payload.username;
      state.signInStatus = "SignedIn";
      state.token = action.payload.token;
      state.loading = false;
      state._id = action.payload._id;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.errors = action.payload.errors;
      state.loading = false;
    });
  },
});

export const { signOut, guestLogin } = slice.actions;

export default reducer = slice.reducer;
