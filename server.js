//this is the server where the route is made 
//it is called when a specific action is performed in the website and later sends to the route in the index.js to carry out the required action

import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
const app = express();
const port = 3000;
const API_URL = "http://localhost:4000";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//main
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/posts`);
    console.log(response);
    res.render("about.ejs", { posts: response.data });
  } catch (error) {
    res.status(500).json({ message: "cannot  posts" });
  }
});

//edit
app.get("/new", (req, res) => {
  res.render("create.ejs", { heading: "new post", submit: "create post" });
});

app.get("/api/edit/:id", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/posts/${req.params.id}`);
    console.log(response.data);
    res.render("create.ejs", {heading: "edit post", submit: "update post",post: response.data,});
  } catch (error) {
    res.status(500).json({ message: "cannot fetch posts" });
  }
});

//new post
app.post("/api/posts", async (req, res) => {
  try {
    const response = await axios.post(`${API_URL}/posts`, req.body);
    console.log(response.data);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "cannot create post" });
  }
});

//update
app.post("/api/posts/:id", async (req, res) => {
  console.log("update taking place");
  try {
    const response = await axios.patch(`${API_URL}/posts/${req.params.id}`,req.body);
    console.log(response.data);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "unable to update" });
  }
});

// Delete a post
app.get("/api/delete/:id", async (req, res) => {
  try {
    await axios.delete(`${API_URL}/posts/${req.params.id}`);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "unable to delete" });
  }
});

//listen
app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
