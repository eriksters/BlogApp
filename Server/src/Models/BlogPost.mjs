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
  LikeCount: {
    type: Number,
    default: 0,
    required: true,
  },
});

mongoose.model("BlogPost", BlogPostSchema);
