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
      setBlogPosts(response.data.BlogPosts);
    });
  }, []);

  return (
    <View style={styles.container}>
      {BlogPosts.length > 0 ? (
        <FlatList
          contentContainerStyle={styles.list}
          data={BlogPosts}
          renderItem={({ item }) => {
            return (
              <View style={styles.itemWrapper}>
                <BlogPostListItem BlogPost={item} />
              </View>
            );
          }}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text style={styles.emptyListText}>No posts to show</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  list: {
    paddingTop: 50,
  },
  itemWrapper: {
    marginBottom: 15,
  },
  emptyListText: {
    textAlign: "center",
  },
});
export default BlogPostList;
