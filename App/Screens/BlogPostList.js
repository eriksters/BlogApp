import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useState, useEffect } from "react";
import BlogPostListItem from "../Components/BlogPostListItem";
import axios from "axios";

const BlogPostList = () => {
  const api = axios.create({
    baseURL: "https://warm-eagle-88.loca.lt",
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
