import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";

test("renders title and author but not URL or number of likes by default", () => {
  const blog = {
    title: "titel",
    author: "mauro",
    url: "urltje",
    likes: 20,
    user: {
      name: "mauro",
    },
  };

  const updateBlog = jest.fn();
  const removeBlog = jest.fn();
  const { container } = render(
    <Blog blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} />
  );

  const div = container.querySelector(".togglableContent");
  expect(div).toHaveStyle("display: none");

  const div2 = container.querySelector(".blog");
  expect(div2).toHaveTextContent("titel mauro");
});

test("blog's URL and number of likes are shown when the button controlling the shown details has been clicked", async () => {
  const blog = {
    title: "titel",
    author: "mauro",
    url: "urltje",
    likes: 20,
    user: {
      name: "mauro",
    },
  };

  const updateBlog = jest.fn();
  const removeBlog = jest.fn();
  const { container } = render(
    <Blog blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} />
  );

  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);

  const div = container.querySelector(".togglableContent");
  expect(div).not.toHaveStyle("display: none");
});

test("like button is clicked twice, the event handler the component received as props is called twice", async () => {
  const blog = {
    title: "titel",
    author: "mauro",
    url: "urltje",
    likes: 20,
    user: {
      name: "mauro",
    },
  };

  const updateBlog = jest.fn();
  const removeBlog = jest.fn();
  render(<Blog blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} />);

  const user = userEvent.setup();
  const button = screen.getByText("like");
  await user.click(button);
  await user.click(button);

  expect(updateBlog.mock.calls).toHaveLength(2);
});

test("like button is clicked twice, the event handler the component received as props is called twice", async () => {
  const blog = {
    title: "titel",
    author: "mauro",
    url: "urltje",
    likes: 20,
    user: {
      name: "mauro",
    },
  };

  const updateBlog = jest.fn();
  const removeBlog = jest.fn();
  const { container } = render(
    <Blog blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} />
  );

  const user = userEvent.setup();
  const button = screen.getByText("like");
  await user.click(button);
  await user.click(button);

  expect(updateBlog.mock.calls).toHaveLength(2);
});
