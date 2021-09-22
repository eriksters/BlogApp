import mongoose from "mongoose";

const BlogPostSchema = new mongoose.Schema({
  Title: String,
  Description: String,
  ThumbnailURL: String,
  Content: String,
  CreateTime: Date,
  CreatedBy: {
    type: String,
    required: true,
  },
});

mongoose.model("BlogPost", BlogPostSchema);
