import * as BlogPost from "./Models/BlogPost.mjs";
import * as Account from "./Models/Account.mjs";

import express from "express";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import * as path from "path";
import BlogPostRoutes from "./Routes/BlogPostRoutes.mjs";
import AccountRoutes from "./Routes/AccountRoutes.mjs";

//  Dev env config
dotenv.config();

//  Mongoose config
//  Generate the connection string
const connectionString = process.env.DB_URL.replace(
  "<username>",
  process.env.DB_USERNAME
).replace("<password>", process.env.DB_PASSWORD);

//  Express config
const port = 3000;
const app = express();

app.use(express.json());

//  Routes
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use(express.static(path.resolve() + "\\public"));

app.use("/blogposts", BlogPostRoutes);
app.use("/account", AccountRoutes);

async function main() {
  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database connection established");
  } catch (err) {
    console.error("Database connection failed");
  }

  app.listen(process.env.PORT);
}

main().catch((err) => {
  console.error("Crashed:\n" + error);
});
