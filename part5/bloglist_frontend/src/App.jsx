import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const addBlog = async (blogObject) => {
    try {
      const addedBlog = await blogService.create(blogObject);
      blogFormRef.current.toggleVisibility();
      setMessage(`Success: Blog ${addedBlog.title} added`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      setBlogs(blogs.concat(addedBlog));
      getBlogs();
    } catch (exception) {
      setMessage(`Error: ${exception.response.data.error}`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const updateBlog = async (blogObject) => {
    try {
      const updatedBlog = await blogService.update(blogObject);
      setMessage(`Success: Blog ${updatedBlog.title} updated`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      setBlogs(
        blogs.map((blog) => (blog.id !== updatedBlog.id ? blog : updatedBlog))
      );
      getBlogs();
    } catch (exception) {
      setMessage(`Error: ${exception.response.data.error}`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const deleteBlog = async (blogObject) => {
    try {
      if (window.confirm(`Remove ${blogObject.title}`)) {
        await blogService.remove(blogObject.id);
        setMessage(`Success: Blog ${blogObject.title} removed`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
        setBlogs(blogs.filter((blog) => blog.id !== blogObject.id));
        getBlogs();
      }
    } catch (exception) {
      setMessage(`Error: ${exception.response.data.error}`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const getBlogs = async () => {
    const blogs = await blogService.getAll();
    blogs.sort((blog1, blog2) => blog2.likes - blog1.likes);
    setBlogs(blogs);
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
      getBlogs();
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setMessage(`Error: ${exception.response.data.error}`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  const blogFormRef = useRef();

  if (user === null)
    return (
      <>
        <Notification message={message} />
        <h2>Log in to application</h2>
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </>
    );

  return (
    <>
      <Notification message={message} />
      <h2>Blogs</h2>
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <h2>Create new</h2>
        <BlogForm createBlog={addBlog} />
      </Togglable>

      <br />
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          removeBlog={deleteBlog}
        />
      ))}
    </>
  );
};

export default App;
