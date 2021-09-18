import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useState, useEffect } from "react";
import BlogPostListItem from "../Components/BlogPostListItem";
import axios from "axios";
import getEnvVars from "../environment";
import { Colors, IconButton } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import NewBlogPostScreen from "./NewBlogPostScreen";

const BlogPostList = ({ navigation, route }) => {
  const ENV_VARS = getEnvVars();
  const API_URL = ENV_VARS.API_URL;

  const api = axios.create({
    baseURL: API_URL,
  });

  const [BlogPosts, setBlogPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(true);

  const updatePosts = async () => {
    setRefreshing(true);

    const response = await api.get("/blogposts");

    setBlogPosts(response.data.BlogPosts);
    setRefreshing(false);
  };

  const getMorePosts = async () => {
    setRefreshing(true);

    const response = await api.get("/blogposts", {
      params: { lastPostTime: BlogPosts[BlogPosts.length - 1].CreateTime },
    });

    setBlogPosts([...BlogPosts, ...response.data.BlogPosts]);
    setRefreshing(false);
  };

  useEffect(() => {
    updatePosts();
  }, []);

  useEffect(() => {
    if (route.params?.NewPost) {
      route.params.NewPost = false;
      updatePosts();
    }
  }, [route.params?.NewPost]);

  useEffect(() => {
    if (route.params?.UpdatedPost) {
      route.params.UpdatedPost = false;
      updatePosts();
    }
  }, [route.params?.UpdatedPost]);

  const onRefresh = () => {
    updatePosts();
  };

  const onCreatePressed = () => {
    navigation.navigate("Create");
  };

  const ListEmptyComponent = () => (
    <View style={styles.emptyListContainer}>
      <Text style={styles.emptyListText}>Nothing to show here</Text>
      <Text style={styles.emptyListText}>Pull down to reload</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        refreshing={refreshing}
        onRefresh={onRefresh}
        contentContainerStyle={styles.list}
        data={BlogPosts}
        renderItem={({ item }) => {
          return (
            <View style={styles.itemWrapper}>
              <BlogPostListItem BlogPost={item} onDeleteCallback={onRefresh} />
            </View>
          );
        }}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={ListEmptyComponent}
        onEndReached={getMorePosts}
      />
      <IconButton
        icon='plus-circle'
        color={Colors.blue500}
        size={60}
        onPress={onCreatePressed}
        style={styles.createButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingTop: 50,
  },
  itemWrapper: {
    marginBottom: 15,
  },
  emptyListContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  emptyListText: {},
  createButton: {
    position: "absolute",
    right: 8,
    bottom: 8,
  },
});
export default BlogPostList;
