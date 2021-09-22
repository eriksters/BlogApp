/*
Account: {
  signedIn: bool
  accountId: null / String
  username: null / String,
  token: null / String
}
*/

const signIn = (email, password) => {
  //  Call the API for a sign in
  // throw new Error("Invalid Username or Password");

  return {
    signedIn: true,
    accountId: 1010,
    username: "BobTucker",
    token: "JWT_TEST_TOKEN",
  };
};

const signOut = () => {
  return {
    signedIn: false,
    accountId: null,
    username: null,
    token: null,
  };
};

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return {
        ...state,
        ...signIn(action.payload.email, action.payload.password),
      };
    case "SIGN_OUT":
      return {
        ...state,
        ...signOut(),
      };
    default:
      return state;
  }
};
