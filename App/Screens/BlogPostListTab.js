import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import NewBlogPostScreen from "./NewBlogPostScreen";
import BlogPostList from "./BlogPostList";
import ViewBlogPostScreen from "./ViewBlogPostScreen";

const BlogPostListTab = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='List' component={BlogPostList} />
      <Stack.Screen name='Create' component={NewBlogPostScreen} />
      <Stack.Screen name='View' component={ViewBlogPostScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});
export default BlogPostListTab;
