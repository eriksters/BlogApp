import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  useFonts,
  Baskervville_400Regular,
} from "@expo-google-fonts/baskervville";
import AppLoading from "expo-app-loading";
import { Provider as PaperProvider } from "react-native-paper";

import BlogPostListItem from "./Components/BlogPostListItem";
import BlogPostList from "./Screens/BlogPostList";
import NewBlogPostScreen from "./Screens/NewBlogPostScreen";

export default function App() {
  let [fontsLoaded] = useFonts({
    Baskervville_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <PaperProvider>
        <StatusBar style='auto' />
        <NewBlogPostScreen />
        {/* 
        <View style={styles.container}>
          <BlogPostList />
          <StatusBar style='auto' />
        </View> 
        */}
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 10,
    // flex: 1,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
