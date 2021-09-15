import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  TouchableHighlightComponent,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import Collapsible from "react-native-collapsible";
import getEnvVars from "../environment";
import axios from "axios";

const BlogPostListItem = ({ BlogPost }) => {
  const [expanded, setExpanded] = useState(false);

  const API_URL = getEnvVars().API_URL;

  const api = axios.create({ baseURL: API_URL });

  const getImageURL = (relativePath) => {
    return `${API_URL}/${BlogPost.ThumbnailURL}`;
  };

  const onDeletePress = async () => {
    console.log("alerting");
    Alert.alert("Delete Post?", "Are you sure you want to do that?", [
      {
        text: "No",
      },
      {
        text: "Yes",
        onPress: () => {
          api.delete("/blogposts/" + BlogPost._id).then((res) => {
            console.log(res);
          });
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.8}>
        <View>
          {BlogPost.ThumbnailURL ? (
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: getImageURL(BlogPost.ThumbnailURL) }}
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
        <Text style={styles.description}>{BlogPost.Description}</Text>
        <View style={styles.optionsBar}>
          <TouchableOpacity style={styles.option}>
            <Entypo name='edit' size={24} color='#555' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={onDeletePress}>
            <MaterialIcons name='delete' size={24} color='#555' />
          </TouchableOpacity>
        </View>
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
  },
  description: {
    marginTop: 5,
    paddingTop: 5,
    marginHorizontal: 5,
    borderTopColor: "#AAA",
    borderTopWidth: 1,
    fontSize: 18,
    fontFamily: "Baskervville_400Regular",
  },
  optionsBar: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  option: {
    paddingTop: 15,
    justifyContent: "center",
    flexGrow: 1,
    alignItems: "center",
  },
  expandTouchArea: {
    paddingVertical: 5,
    alignItems: "center",
  },
});

export default BlogPostListItem;
