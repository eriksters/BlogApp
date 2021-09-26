import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import BlogPostList from "../Components/BlogPostList";
import { getNewBlogPosts } from "../API/BlogPostEndpoint";

const NewestBlogPostListTab = ({ navigation }) => {
  const [BlogPosts, setBlogPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [endReached, setEndReached] = useState(false);

  const refresh = async () => {
    if (!loadingMore && !refreshing) {
      setRefreshing(true);

      setBlogPosts(await getNewBlogPosts());

      setEndReached(false);
      setRefreshing(false);
    }
  };

  const loadMore = async () => {
    if (!endReached && !refreshing) {
      setLoadingMore(true);

      const newPosts = await getNewBlogPosts(
        BlogPosts[BlogPosts.length - 1].CreateTime
      );
      if (newPosts.length > 0) {
        setBlogPosts([...BlogPosts, ...newPosts]);
      } else {
        setEndReached(true);
      }

      setLoadingMore(false);
    }
  };

  const onCreatePressed = () => {
    navigation.navigate("Create");
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <BlogPostList
      BlogPosts={BlogPosts}
      loadMore={loadMore}
      refresh={refresh}
      loadingMore={loadingMore}
      refreshing={refreshing}
      endReached={endReached}
    />
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
export default NewestBlogPostListTab;
