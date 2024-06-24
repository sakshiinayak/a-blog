import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 4000;

let posts = [
  {
    id: 1,
    title: "words of a shopaholic",
    content:
      "life can be tough but shopping makes it better",
    author: "shopisa",
  },
  {
    id: 2,
    title: "can ai replace humans",
    content:
      " while AI can augment human intelligence and perform specialized tasks effectively, it's unlikely to fully replicate the richness and complexity of human intelligence in its entirety. The future may see AI continuing to advance and complement human abilities rather than entirely replacing them.",
    author: "chat gpt",
  },
  {
    id: 3,
    title: "which came first the egg or the chicken",
    content:
      "Eggs come from chickens and chickens come from eggs: that’s the basis of this ancient riddle. But eggs – which are just female sex cells – evolved more than a billion years ago, whereas chickens have been around for just 10,000 years. So the riddle is easily solved…or is it?",
    author: "a site online",
  },
];

let lastId = 3;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//all posts
app.get("/posts", (req, res) => {
  console.log(posts);
  res.json(posts);
});

//specfic post
app.get("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "not found" });
  res.json(post);
});

//new post
app.post("/posts", (req, res) => {
  const newId = lastId += 1;
  const post = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
  };
  lastId = newId;
  posts.push(post);
  res.status(201).json(post);
});

//edit post
app.patch("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "not found" });
  if (req.body.title) post.title = req.body.title;
  if (req.body.content) post.content = req.body.content;
  if (req.body.author) post.author = req.body.author;
  res.json(post);
});

//delete post splice function used to delete the post
app.delete("/posts/:id", (req, res) => {
  const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "not found" });
  posts.splice(index, 1);
  res.json({ message: "post deleted" });
});

//listen
app.listen(port, () => {
  console.log(`api is running at http://localhost:${port}`);
});
