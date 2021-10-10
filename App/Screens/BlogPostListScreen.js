import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import TabItem from "../Components/TabItem";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons,
  Octicons,
} from "@expo/vector-icons";
import BlogPostList from "../Components/BlogPostList";
import { useDispatch } from "react-redux";
import {
  loadMore as loadMoreAction,
  refresh as refreshAction,
} from "../Redux/BlogPostSlice";
import { useSelector } from "react-redux";
import { IconButton, Colors } from "react-native-paper";

const BlogPostListScreen = () => {
  const [selectedTab, setSelectedTab] = useState("new");

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.blogPosts);

  const refreshNew = () => {
    dispatch(refreshAction({ sortBy: "new", filters: {} }));
  };

  const loadMoreNew = () => {
    console.log(posts);
    dispatch(
      loadMoreAction({
        sortBy: "new",
        filters: {},
        page: posts.currentPage + 1,
      })
    );
  };

  const onNewPress = () => {
    setSelectedTab("new");
  };

  const onPopularPress = () => {
    setSelectedTab("popular");
  };

  const onTopPress = () => {
    setSelectedTab("top");
  };

  const refresh = () => {
    console.log("refresh");
    switch (selectedTab) {
      case "new":
        refreshNew();
        break;
      case "popular":
        return;
      default:
        return;
    }
  };

  const loadMore = () => {
    switch (selectedTab) {
      case "new":
        loadMoreNew();
        break;
      case "popular":
        return;
      default:
        return;
    }
  };

  const onCreatePressed = () => {
    navigation.navigate("Create");
  };

  useEffect(() => {
    refresh();
  }, [selectedTab]);

  return (
    <View style={styles.container}>
      <IconButton
        icon='plus-circle'
        color={Colors.blue500}
        size={60}
        onPress={onCreatePressed}
        style={styles.createButton}
      />
      <BlogPostList refresh={refresh} loadMore={loadMore} />
      <View style={styles.tabBar}>
        <TabItem
          selected={selectedTab === "new"}
          icon={({ color, size }) => (
            <MaterialCommunityIcons
              name='newspaper'
              size={size}
              color={color}
            />
          )}
          label='New'
          onPress={onNewPress}
        />
        <TabItem
          selected={selectedTab === "popular"}
          icon={({ color, size }) => (
            <Octicons name='flame' size={size} color={color} />
          )}
          label='Popular'
          onPress={onPopularPress}
        />
        <TabItem
          selected={selectedTab === "top"}
          icon={({ color, size }) => (
            <Ionicons name='ribbon-sharp' size={size} color={color} />
          )}
          label='Top'
          onPress={onTopPress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  tabBar: {
    height: 50,
    backgroundColor: "#fff",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  createButton: {
    position: "absolute",
    right: 8,
    bottom: 50,
    zIndex: 1,
  },
});
export default BlogPostListScreen;
