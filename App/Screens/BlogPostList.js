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
  const [refreshing, setRefreshing] = useState(true);

  const fetchPosts = async () => {
    setRefreshing(true);

    const response = await api.get("/blogposts");

    setBlogPosts(response.data.BlogPosts);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const onRefresh = () => {
    fetchPosts();
  };

  return (
    <View style={styles.container}>
      {BlogPosts.length > 0 ? (
        <FlatList
          refreshing={refreshing}
          onRefresh={onRefresh}
          contentContainerStyle={styles.list}
          data={BlogPosts}
          renderItem={({ item }) => {
            return (
              <View style={styles.itemWrapper}>
                <BlogPostListItem
                  BlogPost={item}
                  onDeleteCallback={onRefresh}
                />
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
