import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BlogPostListItem from "./Components/BlogPostListItem"
import { useFonts, Inter_400Regular } from "@expo-google-fonts/inter"
import AppLoading from "expo-app-loading" 

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_400Regular
  });

  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <View style={styles.container}>
        <BlogPostListItem />
        <Text style={{}}>This is some text</Text>
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    paddingHorizontal: 10,
    flex: 1,
    backgroundColor: '#DDD',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
