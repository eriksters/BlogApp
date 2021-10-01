import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import BlogPostList from "../Components/BlogPostList";
import { getNewBlogPosts } from "../API/BlogPostEndpoint";
import { useSelector, useDispatch } from "react-redux";
import { refresh } from "../Redux/BlogPostSlice";

const NewestBlogPostListTab = ({ navigation }) => {
  const dispatch = useDispatch();

  const refreshPosts = () => {
    console.log("Tab refresh");
    dispatch(refresh({ sortBy: "new", filters: null }));
  };

  const loadMorePosts = () => {
    console.log("Tab load more");
  };

  // useEffect(() => {
  //   refreshPosts();
  // }, []);

  return <BlogPostList loadMore={loadMorePosts} refresh={refreshPosts} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  createButton: {
    position: "absolute",
    right: 8,
    bottom: 8,
  },
});
export default NewestBlogPostListTab;
