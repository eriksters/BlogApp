import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PopularBlogPostListTab = () => {
  return (
    <View style={styles.container}>
      <Text>Popular Posts</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PopularBlogPostListTab;
