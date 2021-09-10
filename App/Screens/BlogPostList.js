import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useState, useEffect } from "react";
import BlogPostListItem from "../Components/BlogPostListItem";
import axios from "axios";
import getEnvVars from "../environment";

const BlogPostList = () => {
  const ENV_VARS = getEnvVars();
  const API_URL = ENV_VARS.API_URL;

  const api = axios.create({
    baseURL: API_URL,
  });

  const [BlogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    api.get("/blogposts").then((response) => {
      console.log(response.data.BlogPosts);
      setBlogPosts(response.data.BlogPosts);
    });
  }, []);

  return (
    <View>
      <Text>Posts</Text>
      <FlatList
        data={BlogPosts}
        renderItem={({ item }) => {
          return (
            <View style={styles.itemWrapper}>
              <BlogPostListItem BlogPost={item} />
            </View>
          );
        }}
        keyExtractor={(item) => item.title}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemWrapper: {
    marginBottom: 15,
  },
});
export default BlogPostList;
