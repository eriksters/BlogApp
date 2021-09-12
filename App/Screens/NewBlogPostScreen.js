import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { Button, TextInput } from "react-native-paper";
import axios from "axios";
import getEnvVars from "../environment";

const NewBlogPostScreen = () => {
  const [thumbNailUri, setThumbNailUri] = useState(undefined);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const API_URL = getEnvVars().API_URL;

  const onSelectPress = () => {
    DocumentPicker.getDocumentAsync({ type: "image/jpeg" }).then(
      ({ uri, size }) => {
        if (uri !== undefined) {
          setThumbNailUri("file://" + uri);
        }
        console.log(
          "Image received. \nSize: " + size + "\nLocation: " + thumbNailUri
        );
      }
    );
  };

  const onSavePress = () => {
    const api = axios.create({ baseURL: API_URL });

    api
      .post("/BlogPosts", {
        BlogPost: {
          Title: title,
          Description: description,
          ThumbnailURL: thumbNailUri,
        },
      })
      .then(({ status }) => {
        console.log("Done, status " + status);
      })
      .catch((err) => {
        console.error("Error:\n" + err);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        label='Title'
        mode='outlined'
        style={styles.titleInput}
        value={title}
        onChangeText={(text) => {
          setTitle(text);
        }}
      />
      <TextInput
        mode='outlined'
        multiline={true}
        numberOfLines={3}
        label='Description'
        value={description}
        onChangeText={(text) => {
          setDescription(text);
        }}
      />
      <Button icon='image' onPress={onSelectPress}>
        Select Thumbnail
      </Button>
      {thumbNailUri !== undefined ? (
        <Image source={{ uri: thumbNailUri }} style={styles.thumbnail} />
      ) : null}
      <Button icon='content-save' onPress={onSavePress}>
        Save
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    paddingTop: 35,
  },
  thumbnail: {
    width: "100%",
    height: 100,
  },
  // titleInput: {
  //   // backgroundColor: "#EEE",
  //   borderRadius: 8,
  //   padding: 3,
  //   fontSize: 16,
  // },
  // descriptionInput: {
  //   backgroundColor: "#EEE",
  //   borderRadius: 8,
  //   padding: 3,
  //   fontSize: 16,
  //   textAlignVertical: "top",
  // },
});
export default NewBlogPostScreen;
