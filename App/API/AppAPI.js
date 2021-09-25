import axios from "axios";
import getEnvVars from "../environment";
import reduxStore from "../Redux/Store";

const envVars = getEnvVars();

const api = axios.create({
  baseURL: envVars.API_URL,
});

export default () => {
  api.defaults.headers.authorization = `Bearer ${
    reduxStore.getState().account.token
  }`;
  return api;
};
