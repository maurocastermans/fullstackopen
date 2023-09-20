const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "blogpost",
    author: "mauro",
    url: "rwerwrw",
    likes: 10,
  },
  {
    title: "blogpost2",
    author: "mauro2",
    url: "rwerwrw2",
    likes: 10,
  },
];

const nonExistingId = async () => {
  const blog = new Note({
    title: "willremovethissoon",
    author: "willremovethissoon",
    url: "willremovethissoon",
    likes: 0,
  });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
};
