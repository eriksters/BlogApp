import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import getEnvVars from "../environment";

const ViewBlogPostScreen = ({ navigation, route }) => {
  const BlogPost = route.params.BlogPost;

  const API_URL = getEnvVars().API_URL;

  return (
    <View style={styles.container}>
      <Image source={{ uri: BlogPost.ThumbnailURL }} style={styles.thumbnail} />
      <Text style={styles.title}>{BlogPost.Title}</Text>
      {BlogPost.Description ? (
        <Text style={styles.description}>{BlogPost.Description}</Text>
      ) : null}
      <Text style={styles.content}>{BlogPost.Content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingTop: 25,
    flex: 1,
    backgroundColor: "#fff",
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
    marginTop: 10,
    borderTopColor: "#DDD",
    borderTopWidth: 1,
    fontSize: 20,
    fontFamily: "Baskervville_400Regular",
  },
  content: {
    marginTop: 10,
    paddingTop: 5,
    fontSize: 16,
    fontFamily: "Baskervville_400Regular",
  },
});
export default ViewBlogPostScreen;
