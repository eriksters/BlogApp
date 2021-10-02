import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, IconButton, Colors } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../Redux/AccountSlice";
import BlogPostList from "../Components/BlogPostList";
import { getNewBlogPosts } from "../API/BlogPostEndpoint";
import { useIsFocused, useFocusEffect } from "@react-navigation/core";
import { loadMore, refresh } from "../Redux/BlogPostSlice";

const MyBlogPostListTab = ({ navigation, route }) => {
  const creatorId = route.params?.creatorId;

  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const onCreatePressed = () => {
    navigation.navigate("Create");
  };

  const refreshPosts = () => {
    dispatch(refresh({ sortBy: "new", filters: { createdBy: creatorId } }));
  };

  const loadMorePosts = () => {
    console.log("Is focused: ");
    if (isFocused) {
      console.log("My posts loading more, why tho?");
      dispatch(loadMore({ sortBy: "new", filters: { createdBy: creatorId } }));
    }
  };

  useFocusEffect(() => {
    refreshPosts();
  });

  return (
    <>
      <BlogPostList loadMore={loadMorePosts} refresh={refreshPosts} />
      <IconButton
        icon='plus-circle'
        color={Colors.blue500}
        size={60}
        onPress={onCreatePressed}
        style={styles.createButton}
      />
    </>
  );

  return (
    <>
      <BlogPostList
        BlogPosts={BlogPosts}
        loadMore={loadMore}
        refresh={refresh}
        endReached={endReached}
      />
      <IconButton
        icon='plus-circle'
        color={Colors.blue500}
        size={60}
        onPress={onCreatePressed}
        style={styles.createButton}
      />
    </>
  );
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
export default MyBlogPostListTab;
