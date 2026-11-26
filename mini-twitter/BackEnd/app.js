const express = require("express");
const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    res.status(200);
    return res.end();
  }
  next();
});

const posts = [];

app.get("/posts", (req, res) => {
  res.status(200).json(posts);
});

app.get("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === Number(req.params.id));
  if (!post) {
    res.status(404);
    return res.end();
  }
  res.status(200).json(post);
});

app.post("/posts", (req, res) => {
  const post = {
    id: posts.length + 1,
    name: req.body["name"] || req.body["title"],
    content: req.body["content"],
    comments: []
  };
  console.log(`Adding this new post ${JSON.stringify(post)}`);
  posts.push(post);
  console.log(`Posts: ${JSON.stringify(posts)}`);
  res.status(201);
  res.end();
});

app.get("/posts/:id/comments", (req, res) => {
  const post = posts.find((p) => p.id === Number(req.params.id));
  if (!post) {
    res.status(404);
    return res.end();
  }
  res.status(200).json(post.comments);
});

app.post("/posts/:id/comments", (req, res) => {
  const post = posts.find((p) => p.id === Number(req.params.id));
  if (!post) {
    res.status(404);
    return res.end();
  }
  const newComment = {
    comment: req.body["comment"]
  };
  console.log(`Adding this new comment ${JSON.stringify(newComment)}`);
  post.comments.push(newComment);
  res.status(201);
  res.end();
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});