import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import BlogPostListItem from "../Components/BlogPostListItem";

const BlogPostList = () => {
  const BlogPosts = [
    {
      title: "Breaking news: College not as fun as you thought it would be!",
      description:
        "It was a sad moment, when a local college student at UCN realized that college has not been what he thought it would be.",
      image: require("../assets/images/sadMan.jpg"),
    },
    {
      title: "Test Blog Post",
      description:
        "This is a legit blog post. I don't know who told you otherwise, but I wouldn't trust that person. Seems kinda shady.",
      image: require("../assets/images/0266554465.jpeg"),
    },
    {
      title: "Another one of those posts, eh?",
      description:
        "How do people even come up with test data? I mean it's embarassing to think someone might read this!",
      image: require("../assets/images/0266554465.jpeg"),
    },
    {
      title: "The car goes wroom wroom!",
      description:
        "Do you ever wonder what a car sounds like? Well, let me tell you a secret. It's 'Wroom Wroom'!",
      image: require("../assets/images/0266554465.jpeg"),
    },
    {
      title: "Do birds have ears?",
      description:
        "That's a stupid question. Of course they don't. Have you looked in the mirror lately? Imagine a bird with those massive things!",
      image: require("../assets/images/0266554465.jpeg"),
    },
    {
      title: "How I turned a drug dealer into a burrito dealer.",
      description:
        "A heartwarming story of how one woman's life was turned around in a delicious way!",
      image: require("../assets/images/0266554465.jpeg"),
    },
  ];

  return (
    <View>
      <FlatList
        data={BlogPosts}
        renderItem={({ item }) => {
          return (
            <View style={styles.itemWrapper}>
              <BlogPostListItem BlogPost={item} />
            </View>
          );
        }}
        keyExtractor={(item) => item.title}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemWrapper: {
    marginBottom: 15,
  },
});
export default BlogPostList;
