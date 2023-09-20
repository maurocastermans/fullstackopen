const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const helper = require("./test_helper");

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe("when there are initially some blogs saved", () => {
  test("correct number of blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test("a specific blog is within the returned blogs", async () => {
    const response = await api.get("/api/blogs");

    const titles = response.body.map((r) => r.title);
    expect(titles).toContain("blogpost2");
  });

  test("unique identifier property of blog posts is named id", async () => {
    const response = await api.get("/api/blogs");

    const blogs = response.body;
    blogs.forEach((blog) => {
      expect(blog.id).toBeDefined();
    });
  });
});

describe("addition of a new blog", () => {
  test("a valid blog can be added", async () => {
    const newBlog = {
      title: "blooooog",
      author: "auteur",
      url: "url",
      likes: 500,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((n) => n.title);
    expect(titles).toContain("blooooog");
  });

  test("blog without likes property is defaulted to zero", async () => {
    const newBlog = {
      title: "blooooog",
      author: "auteur",
      url: "url",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    const blogDefaultedToZero = blogsAtEnd.find(
      (blog) => blog.title === "blooooog"
    );
    expect(blogDefaultedToZero.likes).toBe(0);
  });

  test("blog without title or url properties is not added", async () => {
    const newBlog = {
      author: "auteur",
      likes: 10,
    };

    await api.post("/api/blogs").send(newBlog).expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

describe("deletion of a blog", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const titles = blogsAtEnd.map((r) => r.title);
    expect(titles).not.toContain(blogToDelete.title);
  });
});

describe("update of a blog", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd[0].likes).toBe(blogToUpdate.likes + 1);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
