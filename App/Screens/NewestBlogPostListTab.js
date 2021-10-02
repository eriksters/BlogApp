import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import BlogPostList from "../Components/BlogPostList";
import { getNewBlogPosts } from "../API/BlogPostEndpoint";
import { useSelector, useDispatch } from "react-redux";
import { loadMore, refresh } from "../Redux/BlogPostSlice";
import { useFocusEffect, useIsFocused } from "@react-navigation/core";

const NewestBlogPostListTab = ({ navigation }) => {
  const dispatch = useDispatch();

  const isFocused = useIsFocused();

  const refreshPosts = () => {
    dispatch(refresh({ sortBy: "new", filters: null }));
  };

  const loadMorePosts = () => {
    if (isFocused) {
      dispatch(loadMore({ sortBy: "new", filters: null }));
    }
  };

  useFocusEffect(() => {
    refreshPosts();
  });

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
