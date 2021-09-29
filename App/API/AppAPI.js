import axios from "axios";
import getEnvVars from "../environment";

const envVars = getEnvVars();
let store = null;

export const setStore = (injectedStore) => (store = injectedStore);
export const getStore = () => store;

const api = axios.create({
  baseURL: envVars.API_URL,
});

export default () => {
  if (store === null)
    throw new Error(
      "Store for API has not been initialized. Call setStore(injectedStore)"
    );

  api.defaults.headers.authorization = `Bearer ${
    reduxStore.getState().account.token
  }`;
  return api;
};
