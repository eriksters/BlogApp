import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, IconButton, Colors } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../Redux/AccountSlice";
import BlogPostList from "../Components/BlogPostList";
import { getNewBlogPosts } from "../API/BlogPostEndpoint";
import { NavigationRouteContext } from "@react-navigation/core";

const MyBlogPostListTab = ({ navigation, route }) => {
  const [BlogPosts, setBlogPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [endReached, setEndReached] = useState(false);

  const creatorId = route.params?.creatorId;

  const refresh = async () => {
    setEndReached(false);
    const posts = await getNewBlogPosts(undefined, { createdBy: creatorId });
    setBlogPosts(posts);
    if (posts.length === 0) {
      setEndReached(true);
    }
  };

  const loadMore = async () => {
    const newPosts = await getNewBlogPosts(
      BlogPosts[BlogPosts.length - 1].CreateTime,
      { createdBy: creatorId }
    );

    if (newPosts.length > 0) {
      setBlogPosts([...BlogPosts, ...newPosts]);
    } else {
      setEndReached(true);
    }
  };

  const onCreatePressed = () => {
    navigation.navigate("Create");
  };

  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    if (route.params?.NewPost) {
      console.log("There is a new post");
      refresh();
      route.params.NewPost = false;
    }
  }, [route.params?.NewPost]);

  useEffect(() => {
    if (route.params?.UpdatedPost) {
      refresh();
      route.params.UpdatedPost = false;
    }
  }, [route.params?.UpdatedPost]);

  return (
    <>
      <BlogPostList
        BlogPosts={BlogPosts}
        loadMore={loadMore}
        refresh={refresh}
        loadingMore={loadingMore}
        refreshing={refreshing}
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
