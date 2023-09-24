import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

test("<BlogForm /> updates parent state and calls onSubmit", async () => {
  const createBlog = jest.fn();
  const user = userEvent.setup();

  render(<BlogForm createBlog={createBlog} />);

  const inputs = screen.getAllByRole("textbox");
  const submitButton = screen.getByText("create");

  await user.type(inputs[0], "titel");
  await user.type(inputs[1], "auteur");
  await user.type(inputs[2], "url");

  await user.click(submitButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("titel");
  expect(createBlog.mock.calls[0][0].author).toBe("auteur");
  expect(createBlog.mock.calls[0][0].url).toBe("url");
});
