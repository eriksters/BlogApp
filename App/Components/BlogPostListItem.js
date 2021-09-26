import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import Collapsible from "react-native-collapsible";
import getEnvVars from "../environment";
import axios from "axios";
import { useNavigation } from "@react-navigation/core";
import { deleteBlogPost } from "../API/BlogPostEndpoint";
import { Colors } from "react-native-paper";
import { useSelector } from "react-redux";

const BlogPostListItem = ({ BlogPost, onDeleteCallback }) => {
  const navigation = useNavigation();

  const [expanded, setExpanded] = useState(false);

  const account = useSelector((state) => state.account);

  const onDeletePress = async () => {
    console.log("alerting");
    Alert.alert("Delete Post?", "Are you sure you want to do that?", [
      {
        text: "No",
      },
      {
        text: "Yes",
        onPress: () => {
          deleteBlogPost(BlogPost._id).then(() => {
            onDeleteCallback();
          });
        },
      },
    ]);
  };

  const onEditPress = () => {
    navigation.navigate({ name: "Edit", params: { BlogPost } });
  };

  const onViewPressed = () => {
    navigation.navigate({ name: "View", params: { BlogPost } });
  };

  const onCreatorPressed = () => {
    navigation.navigate({
      name: "CreatedBy",
      params: { creatorId: BlogPost.CreatedBy },
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.8} onPress={onViewPressed}>
        <View>
          {BlogPost.ThumbnailURL ? (
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: BlogPost.ThumbnailURL }}
                style={styles.image}
              />
              <LinearGradient
                colors={["#FFF0", "#FFF"]}
                start={{ x: 0, y: 0.6 }}
                style={styles.linearGradient}
              ></LinearGradient>
            </View>
          ) : null}

          <View style={styles.titleContainer}>
            <Text style={styles.title}>{BlogPost.Title}</Text>
          </View>
        </View>
      </TouchableOpacity>

      <Collapsible
        collapsed={!expanded}
        easing='quad'
        style={styles.collapsible}
      >
        <TouchableOpacity
          style={styles.creatorContainer}
          onPress={onCreatorPressed}
        >
          <Text>By </Text>
          <Text style={styles.creator}>{BlogPost.CreatedByUsername}</Text>
        </TouchableOpacity>
        {BlogPost.Description ? (
          <Text style={styles.description}>{BlogPost.Description}</Text>
        ) : null}
        {account._id === BlogPost.CreatedBy ? (
          <View style={styles.optionsBar}>
            <TouchableOpacity style={styles.option} onPress={onEditPress}>
              <Entypo name='edit' size={24} color='#555' />
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={onDeletePress}>
              <MaterialIcons name='delete' size={24} color='#555' />
            </TouchableOpacity>
          </View>
        ) : null}
      </Collapsible>

      <TouchableOpacity
        style={styles.expandTouchArea}
        onPress={() => {
          setExpanded(!expanded);
        }}
      >
        {expanded ? (
          <Entypo name='chevron-thin-up' size={24} color='#555' />
        ) : (
          <Entypo name='chevron-thin-down' size={24} color='#555' />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  imageContainer: {
    height: 130,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  linearGradient: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  titleContainer: {
    paddingHorizontal: 5,
  },
  title: {
    fontFamily: "Baskervville_400Regular",
    fontSize: 22,
    marginBottom: 10,
  },
  collapsible: {
    borderTopColor: "#AAA",
    borderTopWidth: 1,
  },
  creatorContainer: {
    alignSelf: "flex-end",
    alignItems: "flex-end",
    paddingHorizontal: 20,
    paddingVertical: 5,
    flexDirection: "row",
  },
  creator: {
    fontWeight: "bold",
    color: Colors.blue500,
  },
  description: {
    marginTop: 5,
    paddingTop: 5,
    marginHorizontal: 5,
    fontSize: 18,
    fontFamily: "Baskervville_400Regular",
  },
  optionsBar: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  option: {
    paddingTop: 20,
    justifyContent: "center",
    flexGrow: 1,
    alignItems: "center",
  },
  expandTouchArea: {
    paddingBottom: 5,
    paddingTop: 16,
    alignItems: "center",
  },
});

export default BlogPostListItem;
