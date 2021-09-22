import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import CreateBlogPostScreen from "./CreateBlogPostScreen";
import BlogPostList from "./BlogPostList";
import ViewBlogPostScreen from "./ViewBlogPostScreen";
import EditBlogPostScreen from "./EditBlogPostScreen";

const NewestBlogPostListTab = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='List' component={BlogPostList} />
      <Stack.Screen name='Create' component={CreateBlogPostScreen} />
      <Stack.Screen name='View' component={ViewBlogPostScreen} />
      <Stack.Screen name='Edit' component={EditBlogPostScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});
export default NewestBlogPostListTab;
