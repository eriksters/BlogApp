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
  likedBy: [{ type: mongoose.Types.ObjectId, required: true, default: [] }],
});

mongoose.model("BlogPost", BlogPostSchema);
