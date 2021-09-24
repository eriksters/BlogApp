import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getEnvVars from "../environment";

export const signUp = createAsyncThunk(
  "account/signUp",
  async ({ username, password, email }, thunkAPI) => {
    try {
      const response = await axios.post(
        getEnvVars().API_URL + "/account/signup",
        {
          username,
          password,
          email,
        }
      );

      return {
        token: response.data.token,
        username: response.data.username,
      };
    } catch (err) {
      console.log("Response data: \n", err.response.data);

      if (err.response.status === 400) {
        return thunkAPI.rejectWithValue(err.response.data);
      }

      return thunkAPI.rejectWithValue("Problem on our end. Try again later.");
    }
  }
);

const slice = createSlice({
  name: "account",

  initialState: {
    errors: [],
    signedIn: false,
    loading: false,
    username: null,
    token: null,
  },

  reducers: {
    signOut(state, action) {
      state.username = null;
      state.signedIn = false;
      state.token = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(signUp.pending, (state) => {
      state.errors = [];
      state.loading = true;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.errors = [];
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.signedIn = true;
      state.loading = false;
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.errors = action.payload.errors;
      state.loading = false;
    });
  },
});

export default reducer = slice.reducer;
