export const signIn = (email, password) => {
  return {
    type: "SIGN_IN",
    payload: {
      email,
      password,
    },
  };
};

export const signOut = () => {
  return {
    type: "SIGN_OUT",
  };
};
