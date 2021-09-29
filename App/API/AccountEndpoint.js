import getInstance, { getStore } from "./AppAPI";

export const signIn = async (email, password) => {
  const api = getInstance();

  const response = await api.post("/account/signin", {
    email,
    password,
  });

  return {
    token: response.data.token,
    username: response.data.username,
    _id: response.data._id,
  };
};

export const signUp = async (email, password, username) => {
  const api = getInstance();

  const response = await api.post("/account/signup", {
    username,
    password,
    email,
  });

  return {
    token: response.data.token,
    username: response.data.username,
    _id: response.data._id,
  };
};
