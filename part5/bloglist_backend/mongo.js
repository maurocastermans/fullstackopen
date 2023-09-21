const mongoose = require("mongoose");

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0.7zh1j1q.mongodb.net/testBloglistApp?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model("Blog", blogSchema);

const blog = new Blog({
  title: "blogpost2",
  author: "mauropoooo",
  url: "rwerwrw",
  likes: 10,
});

blog.save().then((result) => {
  console.log("blog saved!");
  mongoose.connection.close();
});
