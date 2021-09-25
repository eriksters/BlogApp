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
      const response = await axios.post(
        getEnvVars().API_URL + "/account/signin",
        {
          email,
          password,
        }
      );

      return {
        token: response.data.token,
        username: response.data.username,
      };
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
    //  Sign up
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
      console.log(action);
      console.log("Errrr");
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
      state.signedIn = true;
      state.token = action.payload.token;
      state.loading = false;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.errors = action.payload.errors;
      state.loading = false;
    });
  },
});

export default reducer = slice.reducer;
