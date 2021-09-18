import React, { useState, useReducer } from "react";
import { View, ScrollView, Text, StyleSheet, Image, Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { Button, TextInput } from "react-native-paper";
import axios from "axios";
import getEnvVars from "../environment";
import BlogPostEditor from "../Components/BlogPostEditor";

const NewBlogPostScreen = ({ navigation, route, onSuccess }) => {
  const API_URL = getEnvVars().API_URL;

  const api = axios.create({ baseURL: API_URL });

  const [BlogPost, setBlogPost] = useState({});
  const [saving, setSaving] = useState(false);

  const reducer = (state, action) => {
    switch (action.type) {
      case "Title":
        return { ...state, Title: action.payload };
      case "Description":
        return { ...state, Description: action.payload };
      case "Content":
        return { ...state, Content: action.payload };
      case "ThumbnailURL":
        return { ...state, ThumbnailURL: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, BlogPost);

  const onSave = async () => {
    setSaving(true);
    const data = new FormData();

    data.append("Thumbnail", {
      name: state.ThumbnailURL.substring(
        state.ThumbnailURL.lastIndexOf("/") + 1
      ),
      type: "image/jpeg",
      uri: state.ThumbnailURL,
    });

    data.append(
      "Data",
      JSON.stringify({
        Title: state.Title,
        Description: state.Description,
        Content: state.Content,
      })
    );

    try {
      await api.post("/blogposts", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Post Saved Successfully");
      navigation.navigate({ name: "List", params: { NewPost: true } });
    } catch (err) {
      console.error("Error Saving Post", err);
    }
    setSaving(false);
  };

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

  return (
    <BlogPostEditor
      State={state}
      update={dispatch}
      onSave={onSave}
      saving={saving}
    />
  );
};
export default NewBlogPostScreen;
