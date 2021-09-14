import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  useFonts,
  Baskervville_400Regular,
} from "@expo-google-fonts/baskervville";
import AppLoading from "expo-app-loading";
import {
  Provider as PaperProvider,
  BottomNavigation,
} from "react-native-paper";

import BlogPostListItem from "./Components/BlogPostListItem";
import BlogPostList from "./Screens/BlogPostList";
import NewBlogPostScreen from "./Screens/NewBlogPostScreen";

export default function App() {
  let [fontsLoaded] = useFonts({
    Baskervville_400Regular,
  });

  const CreateBlogPostRoute = () => <NewBlogPostScreen />;
  const BlogPostListRoute = () => <BlogPostList />;

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "blogPostList", title: "List", icon: "view-list-outline" },
    { key: "createBlogPost", title: "Create", icon: "plus-box" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    blogPostList: BlogPostListRoute,
    createBlogPost: CreateBlogPostRoute,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <PaperProvider>
        <StatusBar style={styles.statusBar} translucent={true} />
        {/* <View style={styles.container}> */}
        <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
        />

        {/* </View> */}
      </PaperProvider>
    );

    // <PaperProvider>
    //   <StatusBar style='auto' />
    //   <NewBlogPostScreen />

    //   <View style={styles.container}>
    //     <BlogPostList />
    //     <StatusBar style='auto' />
    //   </View>
    // </PaperProvider>
    // );
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
  statusBar: {},
});
