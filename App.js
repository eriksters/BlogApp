import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import BlogPostListItem from "./Components/BlogPostListItem";
import {
  useFonts,
  Baskervville_400Regular,
} from "@expo-google-fonts/baskervville";
import AppLoading from "expo-app-loading";

export default function App() {
  let [fontsLoaded] = useFonts({
    Baskervville_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <BlogPostListItem
          BlogPost={{
            image: require("./assets/images/sadMan.jpg"),
            description:
              "It was a sad moment, when a local college student at UCN realized that college has not been what he thought it would be.",
            title:
              "Breaking news: College not as fun as you thought it would be!",
          }}
        />
        <StatusBar style='auto' />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    paddingHorizontal: 10,
    flex: 1,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
