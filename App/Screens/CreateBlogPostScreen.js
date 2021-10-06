import React, { useState, useReducer, useEffect } from "react";
import { View, ScrollView, Text, StyleSheet, Image, Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { Button, TextInput } from "react-native-paper";
import axios from "axios";
import getEnvVars from "../environment";
import BlogPostEditor from "../Components/BlogPostEditor";
import { createBlogPost } from "../API/BlogPostEndpoint";
import { useSelector, useDispatch } from "react-redux";
import { create } from "../Redux/BlogPostSlice";

const CreateBlogPostScreen = ({ navigation, route }) => {
  const [BlogPost, setBlogPost] = useState({});
  const [hasSaved, setHasSaved] = useState(false);

  const globalState = useSelector((state) => state.blogPosts);
  const globalDispatch = useDispatch();

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
    setHasSaved(true);

    globalDispatch(
      create({
        title: state.Title,
        description: state.Description,
        content: state.Content,
        thumbnailURL: state.ThumbnailURL,
      })
    );
  };

  useEffect(() => {
    if (!globalState.saving && hasSaved && globalState.errors.length === 0) {
      navigation.pop();
    }
  }, [globalState.saving]);

  return (
    <BlogPostEditor
      State={state}
      update={dispatch}
      onSave={onSave}
      saving={globalState.saving}
    />
  );
};
export default CreateBlogPostScreen;
