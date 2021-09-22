import React from "react";
import { View, Text, StyleSheet } from "react-native";

const MyBlogPostListTab = () => {
  return (
    <View style={styles.container}>
      <Text>My posts</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default MyBlogPostListTab;
