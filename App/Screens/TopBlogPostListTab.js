import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TopBlogPostListTab = () => {
  return (
    <View style={styles.container}>
      <Text>Top Posts</Text>
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
export default TopBlogPostListTab;
