import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const signUp = createAsyncThunk(
  "account/signUp",
  async (signUpData, thunkAPI) => {
    try {
      const response = await axios.get("https://reqres.in/api/users/2?delay=3");

      return {
        token: "JWT_TEST_TOKEN",
        username: "eriksters",
      };
    } catch (err) {
      return thunkAPI.rejectWithValue("Sign Up Error");
    }
  }
);

const slice = createSlice({
  name: "account",

  initialState: {
    error: null,
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
      state.loading = true;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.signedIn = true;
      state.loading = false;
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

// export const { signOut } = slice.actions;

export default reducer = slice.reducer;

// export const signUp = (email, password, username) => {
//   return {
//     type: "SIGN_UP",
//     payload: {
//       email,
//       password,
//       username,
//     },
//   };
// };

// export const signOut = () => {
//   return {
//     type: "SIGN_OUT",
//   };
// };

// export const signUpAsync = async (email, password, username) => (dispatch) => {
//   setTimeout(() => {
//     dispatch(signUp(email, password, username));
//   });
// };

// const signIn = (email, password) => {
//   //  Call the API for a sign in
//   // throw new Error("Invalid Username or Password");

//   return {
//     signedIn: true,
//     accountId: 1010,
//     username: "BobTucker",
//     token: "JWT_TEST_TOKEN",
//   };
// };

// const signOut = () => {
//   return {
//     signedIn: false,
//     accountId: null,
//     username: null,
//     token: null,
//   };
// };

// const signUp = (email, password, username) => {
//   console.log("Signing Up");

//   return {
//     signedIn: true,
//     accountId: 1010,
//     username: "BobTucker",
//     token: "JWT_TEST_TOKEN",
//   };
// };

// export const reducer = (state = {}, action) => {
//   switch (action.type) {
//     case "SIGN_IN":
//       return {
//         ...state,
//         ...signIn(action.payload.email, action.payload.password),
//       };
//     case "SIGN_OUT":
//       return {
//         ...state,
//         ...signOut(),
//       };
//     case "SIGN_UP":
//       return {
//         ...state,
//         ...signUp(
//           action.payload.email,
//           action.payload.password,
//           action.payload.username
//         ),
//       };
//     default:
//       return state;
//   }
// };

/*
Account: {
  signedIn: bool
  username: null / String,
  token: null / String,
  loading: bool
}
*/

// export const signIn = createAsyncTrunk(
//   "account/signIn",
//   async ({ email, password }, trunkAPI) => {
//     return { username: email };
//   }
// );
