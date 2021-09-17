import React, { useState } from "react";
import { View, ScrollView, Text, StyleSheet, Image, Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { Button, TextInput } from "react-native-paper";
import axios from "axios";
import getEnvVars from "../environment";

const NewBlogPostScreen = ({ navigation, onSuccess }) => {
  const [thumbnailUri, setThumbNailUri] = useState(undefined);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  const API_URL = getEnvVars().API_URL;

  const api = axios.create({ baseURL: API_URL });

  const onSavePress = () => {
    console.log("Saving");

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
        Content: content,
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

  return (
    <View style={styles.container}>
      <Button
        mode='contained'
        icon='content-save'
        onPress={onSavePress}
        style={styles.saveButton}
      >
        Save
      </Button>
      <ScrollView>
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
          style={styles.descriptionInput}
          numberOfLines={3}
          label='Description'
          value={description}
          onChangeText={(text) => {
            setDescription(text);
          }}
        />
        <TextInput
          mode='outlined'
          multiline={true}
          style={styles.contentInput}
          numberOfLines={5}
          label='Content'
          value={content}
          onChangeText={(text) => {
            setContent(text);
          }}
        />
        <Text style={styles.thumbnailSectionTitle}>Post Thumbnail</Text>
        {thumbnailUri !== undefined ? (
          <Image source={{ uri: thumbnailUri }} style={styles.thumbnail} />
        ) : null}
        <Button
          style={styles.selectThumbnailButton}
          icon='image'
          onPress={onSelectPress}
        >
          Select
        </Button>

        <View style={styles.bottomPadding}></View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    paddingTop: 35,
    backgroundColor: "#fff",
  },
  saveButton: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    justifyContent: "center",
    height: 50,
    width: "95%",
    zIndex: 1,
  },
  thumbnailSectionTitle: {
    fontSize: 16,
    marginTop: 10,
    alignSelf: "center",
  },
  selectThumbnailButton: {
    marginTop: 10,
  },
  thumbnail: {
    width: "100%",
    height: 100,
    marginTop: 5,
  },
  descriptionInput: {
    marginTop: 5,
  },
  contentInput: {
    marginTop: 5,
  },
  bottomPadding: {
    height: 80,
  },
});
export default NewBlogPostScreen;
