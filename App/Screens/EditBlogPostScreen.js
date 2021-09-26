import React, { useState, useReducer } from "react";
import { View, Text, StyleSheet } from "react-native";
import BlogPostEditor from "../Components/BlogPostEditor";
import getEnvVars from "../environment";
import axios from "axios";
import { editBlogPost } from "../API/BlogPostEndpoint";

const EditBlogPostScreen = ({ navigation, route }) => {
  const [newThumbnail, setNewThumbnail] = useState(false);
  const [BlogPost, setBlogPost] = useState(route.params.BlogPost);
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
        setNewThumbnail(true);
        return { ...state, ThumbnailURL: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, BlogPost);

  const onSave = async () => {
    setSaving(true);

    try {
      await editBlogPost(
        BlogPost._id,
        state.Title,
        state.Description,
        state.Content,
        newThumbnail ? state.ThumbnailURL : undefined
      );

      navigation.navigate({ name: "Home", params: { UpdatedPost: true } });
    } catch (err) {
      console.error("Error updating post:\n", err);
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

const styles = StyleSheet.create({});

export default EditBlogPostScreen;
