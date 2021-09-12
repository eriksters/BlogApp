import express from "express";

const port = 3000;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

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

app.post("/blogposts", (req, res) => {
  const { Title, Description, Thumbnail } = req.body.BlogPost;

  res.sendStatus(200);
});

app.listen(port);
