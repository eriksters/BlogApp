import { configureStore } from "@reduxjs/toolkit";
import AccountReducer from "./AccountSlice";

export default reduxStore = configureStore({
  reducer: { account: AccountReducer },
});
