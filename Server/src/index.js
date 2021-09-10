import express from "express";

const port = 3000;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/blogposts", (req, res) => {
  const post = {
    title: "Post from the net",
    description: "Welcome to the internet. Come and take a seat.",
    image:
      "https://www.pixsy.com/wp-content/uploads/2021/04/ben-sweet-2LowviVHZ-E-unsplash-1.jpeg",
  };

  res.send({ blogPost: post });
});

app.listen(port);
