import mongoose from "mongoose";
import UniqueArray from "mongoose-unique-array";

const schema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  LikedPosts: [{ type: [mongoose.Types.ObjectId], unique: true }],
});
schema.plugin(UniqueArray);

mongoose.model("Account", schema);
