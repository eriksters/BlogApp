import express, { json } from "express";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import multer from "multer";
import * as fs from "fs/promises";
import * as path from "path";

//  Dev env config
dotenv.config();

//  Multer Config
const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "Temp");
  },
  filename(req, file, callback) {
    console.log(file);
    callback(
      null,
      `temp_${Math.floor(99999 * Math.random())}.${file.originalname.substring(
        file.originalname.lastIndexOf(".") + 1
      )}`
    );
  },
});

const upload = multer({ storage });

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
app.use(express.static(path.resolve() + "\\public"));

app.get("/blogposts", async (req, res) => {
  // const BlogPosts = [
  //   {
  //     title: "Post from the net",
  //     description: "Welcome to the internet. Come and take a seat.",
  //     image:
  //       "https://www.pixsy.com/wp-content/uploads/2021/04/ben-sweet-2LowviVHZ-E-unsplash-1.jpeg",
  //   },
  //   {
  //     title:
  //       "Testing whether massive amounts of caffeine increase productivity?",
  //     description: "I see time!",
  //     image:
  //       "https://wompampsupport.azureedge.net/fetchimage?siteId=7716&url=https%3A%2F%2Fwww.cancer.org%2Fcontent%2Fdam%2Fcancer-org%2Fimages%2Fphotographs%2Fsingle-use%2Fespresso-coffee-cup-with-beans-on-table-restricted.jpg%2Fjcr%3Acontent%2Frenditions%2Fcq5dam.web.1280.1280.jpeg",
  //   },
  // ];

  try {
    const BlogPosts = await BlogPostModel.find({}).exec();
    // .sort({ Title: "ascending" })
    // .limit(20);

    console.log("Received posts:\n", BlogPosts);

    res.status(200).send({ BlogPosts });
  } catch (err) {
    console.error("Failed getting posts. ", err);
    res.sendStatus(500);
  }
});

app.post(
  "/blogposts",
  upload.fields([{ name: "Thumbnail" }, { name: "Data" }]),
  async (req, res) => {
    const BlogPostData = JSON.parse(req.body.Data);

    const BlogPostModel = mongoose.model("BlogPost");
    const NewPost = new BlogPostModel(BlogPostData);

    console.log(BlogPostData);

    try {
      const CreatedPost = await NewPost.save();

      //  Rename the file to Id generated by DB
      const oldPath = req.files.Thumbnail[0].path;
      const fileExtension = oldPath.substring(oldPath.lastIndexOf("."));
      const newPath = `public/Thumbnails/${CreatedPost._id.toString()}${fileExtension}`;
      await fs.rename(`${req.files.Thumbnail[0].path}`, newPath);

      //  Save URL to DB
      NewPost.ThumbnailURL = newPath;
      await NewPost.save();

      // BlogPostModel.updateOne({})
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }

    // console.log("Done creating new post", CreatedPost._id.toString());
    res.sendStatus(200);
  }
);

// app.post(
//   "/upload",
//   upload.fields([{ name: "photo" }, { name: "BlogPost" }]),
//   (req, res) => {
//     console.log("file", req.files);
//     console.log(req.body);
//     res.sendStatus(200);
//   }
// );

async function getPosts() {
  const BlogPost = mongoose.model("BlogPost");

  const query = BlogPost.find({});

  console.error("Counting");
  console.log(await query.count().exec());
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
