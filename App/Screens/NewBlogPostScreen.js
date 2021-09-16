import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { Button, TextInput } from "react-native-paper";
import axios from "axios";
import getEnvVars from "../environment";

const NewBlogPostScreen = ({ navigation, onSuccess }) => {
  const [thumbnailUri, setThumbNailUri] = useState(undefined);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const API_URL = getEnvVars().API_URL;

  const api = axios.create({ baseURL: API_URL });

  const onSavePress = () => {
    const data = new FormData();

    data.append("Thumbnail", {
      name: thumbnailUri.substring(thumbnailUri.lastIndexOf("/") + 1),
      type: "image/jpeg",
      uri: thumbnailUri,
    });

    data.append(
      "Data",
      JSON.stringify({
        Title: title,
        Description: description,
      })
    );

    api
      .post("/blogposts", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        console.log("Post Saved Successfully");
        navigation.navigate({ name: "List", params: { NewPost: true } });
      })
      .catch((err) => {
        console.error("Error Saving Post", err);
      });
  };

  const onSelectPress = async () => {
    const status = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!status.granted) {
      Alert.alert("We need the permission to access your photos to do that");
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 1],
      });

      setThumbNailUri(result.uri);
    }
  };

  // const onSavePress = () => {
  //   api
  //     .post("/BlogPosts", {
  //       BlogPost: {
  //         Title: title,
  //         Description: description,
  //         ThumbnailURL: thumbnailUri,
  //       },
  //     })
  //     .then(({ status }) => {
  //       console.log("Done, status " + status);
  //     })
  //     .catch((err) => {
  //       console.error("Error:\n" + err);
  //     });
  // };

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
      {thumbnailUri !== undefined ? (
        <Image source={{ uri: thumbnailUri }} style={styles.thumbnail} />
      ) : null}
      <Button icon='content-save' onPress={onSavePress}>
        Save
      </Button>
      {/* <Button icon='upload' onPress={onUploadPress}>
        Upload
      </Button> */}
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
