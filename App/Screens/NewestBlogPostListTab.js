import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import BlogPostList from "../Components/BlogPostList";
import { getNewBlogPosts } from "../API/BlogPostEndpoint";

const NewestBlogPostListTab = ({ navigation }) => {
  const [BlogPosts, setBlogPosts] = useState([]);
  const [endReached, setEndReached] = useState(false);

  const refresh = async () => {
    setEndReached(false);

    const posts = await getNewBlogPosts();
    setBlogPosts(posts);

    if (posts.length === 0) {
      setEndReached(true);
    }

    console.log(Date.now());
  };

  const loadMore = async () => {
    const newPosts = await getNewBlogPosts(
      BlogPosts[BlogPosts.length - 1].CreateTime
    );

    if (newPosts.length > 0) {
      setBlogPosts([...BlogPosts, ...newPosts]);
    } else {
      setEndReached(true);
    }
  };

  return (
    <BlogPostList
      BlogPosts={BlogPosts}
      loadMore={loadMore}
      refresh={refresh}
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
