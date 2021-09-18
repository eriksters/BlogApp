import React, { useState, useReducer } from "react";
import { View, Text, StyleSheet } from "react-native";
import BlogPostEditor from "../Components/BlogPostEditor";
import getEnvVars from "../environment";
import axios from "axios";

const EditBlogPostScreen = ({ navigation, route }) => {
  const API_URL = getEnvVars().API_URL;

  const api = axios.create({ baseURL: API_URL });

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
    const data = new FormData();

    if (newThumbnail) {
      data.append("Thumbnail", {
        name: state.ThumbnailURL.substring(
          state.ThumbnailURL.lastIndexOf("/") + 1
        ),
        type: "image/jpeg",
        uri: state.ThumbnailURL,
      });
    }

    data.append(
      "Data",
      JSON.stringify({
        Title: state.Title,
        Description: state.Description,
        Content: state.Content,
      })
    );

    try {
      await api.put("/blogposts/" + BlogPost._id, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Post Saved Successfully");
      navigation.navigate({ name: "List", params: { UpdatedPost: true } });
    } catch (err) {
      console.error("Error Saving Post", err);
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
