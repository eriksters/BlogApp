import { configureStore } from "@reduxjs/toolkit";
import AccountReducer from "./AccountSlice";
import BlogPostReducer from "./BlogPostSlice";

export default reduxStore = configureStore({
  reducer: { account: AccountReducer, blogPosts: BlogPostReducer },
});
