import React, { useState } from "react";
import { View, ScrollView, Text, StyleSheet, Image, Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { Button, TextInput } from "react-native-paper";
import axios from "axios";
import getEnvVars from "../environment";

const BlogPostEditor = ({ State, update, onSave }) => {
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

      if (!result.cancelled) {
        update({ type: "ThumbnailURL", payload: result.uri });
      }
    }
  };

  return (
    <View style={styles.container}>
      <Button
        mode='contained'
        icon='content-save'
        onPress={onSave}
        style={styles.saveButton}
      >
        Save
      </Button>
      <ScrollView>
        <TextInput
          label='Title'
          mode='outlined'
          style={styles.titleInput}
          value={State.Title}
          onChangeText={(text) => {
            update({ type: "Title", payload: text });
          }}
        />
        <TextInput
          mode='outlined'
          multiline={true}
          style={styles.descriptionInput}
          numberOfLines={3}
          label='Description'
          value={State.Description}
          onChangeText={(text) => {
            update({ type: "Description", payload: text });
          }}
        />
        <TextInput
          mode='outlined'
          multiline={true}
          style={styles.contentInput}
          numberOfLines={5}
          label='Content'
          value={State.Content}
          onChangeText={(text) => {
            update({ type: "Content", payload: text });
          }}
        />
        <Text style={styles.thumbnailSectionTitle}>Post Thumbnail</Text>
        {State.ThumbnailURL !== undefined ? (
          <Image
            source={{ uri: State.ThumbnailURL }}
            style={styles.thumbnail}
          />
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
export default BlogPostEditor;
