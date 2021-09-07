import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

const BlogPostListItem = () => {
  return (
  <View style={styles.container}>
    <View style={styles.imageContainer}>
    <Image source={require('../assets/images/0266554465.jpeg')} style={styles.image}/>
      <LinearGradient colors={['#FFF0', '#FFF']} start={{x:0, y: 0.6}} style={styles.linearGradient}>
      </LinearGradient>
    </View>
    <View style={styles.titleContainer}>
      <Text style={styles.title}>
        Breaking news: College not as fun as you thought it would be!
      </Text>
    </View>
  </View>
  )
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 200,
    borderColor: "red",
    borderWidth: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: 'hidden'
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  titleContainer: {
    height: 100
  },
  title: {
    fontFamily: 'KaiseiTokumin-Regular'
  },


  linearGradient: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
});

export default BlogPostListItem;