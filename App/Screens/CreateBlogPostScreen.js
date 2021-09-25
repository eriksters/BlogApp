import React, { useState, useReducer } from "react";
import { View, ScrollView, Text, StyleSheet, Image, Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { Button, TextInput } from "react-native-paper";
import axios from "axios";
import getEnvVars from "../environment";
import BlogPostEditor from "../Components/BlogPostEditor";
import { createBlogPost } from "../API/BlogPostEndpoint";

const CreateBlogPostScreen = ({ navigation, route, onSuccess }) => {
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

    try {
      await createBlogPost(
        state.Title,
        state.Description,
        state.Content,
        state.ThumbnailURL
      );

      navigation.navigate({ name: "List", params: { NewPost: true } });
    } catch (err) {
      console.log("Error saving post\n", err);
    }

    setSaving(false);
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
export default CreateBlogPostScreen;
