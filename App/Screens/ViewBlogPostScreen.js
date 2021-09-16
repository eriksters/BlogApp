import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import getEnvVars from "../environment";

const ViewBlogPostScreen = ({ navigation, route }) => {
  const BlogPost = route.params.BlogPost;

  const API_URL = getEnvVars().API_URL;

  const getImageURL = (relativePath) => {
    return `${API_URL}/${BlogPost.ThumbnailURL}`;
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: getImageURL(BlogPost.ThumbnailURL) }}
        style={styles.thumbnail}
      />
      <Text style={styles.title}>{BlogPost.Title}</Text>
      <Text style={styles.description}>{BlogPost.Description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingTop: 25,
  },
  thumbnail: {
    width: "100%",
    height: 100,
  },
  title: {
    fontSize: 24,
    fontFamily: "Baskervville_400Regular",
  },
  description: {
    fontSize: 20,
    fontFamily: "Baskervville_400Regular",
  },
});
export default ViewBlogPostScreen;
