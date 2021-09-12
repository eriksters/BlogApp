import express from "express";

import * as dotenv from "dotenv";
import mongoose from "mongoose";

//  Dev env config
dotenv.config();

//  Mongoose config
//  Generate the connection string
const connectionString = process.env.DB_URL.replace(
  "<username>",
  process.env.DB_USERNAME
).replace("<password>", process.env.DB_PASSWORD);

const BlogPostSchema = new mongoose.Schema({
  Title: String,
  Description: String,
  ThumbnailURL: String,
});

const BlogPostModel = mongoose.model("BlogPost", BlogPostSchema);

//  Express config
const port = 3000;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

//  Routes
app.get("/blogposts", (req, res) => {
  const BlogPosts = [
    {
      title: "Post from the net",
      description: "Welcome to the internet. Come and take a seat.",
      image:
        "https://www.pixsy.com/wp-content/uploads/2021/04/ben-sweet-2LowviVHZ-E-unsplash-1.jpeg",
    },
    {
      title:
        "Testing whether massive amounts of caffeine increase productivity?",
      description: "I see time!",
      image:
        "https://wompampsupport.azureedge.net/fetchimage?siteId=7716&url=https%3A%2F%2Fwww.cancer.org%2Fcontent%2Fdam%2Fcancer-org%2Fimages%2Fphotographs%2Fsingle-use%2Fespresso-coffee-cup-with-beans-on-table-restricted.jpg%2Fjcr%3Acontent%2Frenditions%2Fcq5dam.web.1280.1280.jpeg",
    },
  ];

  res.send({ BlogPosts });
});

app.post("/blogposts", async (req, res) => {
  console.log("Creating new post");

  const BlogPostModel = mongoose.model("BlogPost");
  const NewPost = new BlogPostModel(req.body.BlogPost);

  await NewPost.save();

  console.log("Done creating new post");
  res.sendStatus(200);
});

async function getPosts() {
  const BlogPost = mongoose.model("BlogPost");

  const query = BlogPost.find({});

  console.error("Counting");
  console.log(await query.count().exec());
}

async function createPost() {
  console.log("creating new post");

  const BlogPostModel = mongoose.model("BlogPost");

  const newPost = new BlogPostModel({
    Title: "Post through Mongoose",
    Description: "Pretty amazed that this actually worked",
    Image:
      "https://www.pixsy.com/wp-content/uploads/2021/04/ben-sweet-2LowviVHZ-E-unsplash-1.jpeg",
  });

  newPost.save().then(() => {
    console.log("Done creating post");
  });
}

async function main() {
  await mongoose
    .connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database connection established");
    })
    .catch((err) => {
      console.error("Database connection failed");
    });

  app.listen(port);
}

main().catch((err) => {
  console.error("Crashed:\n" + error);
});
