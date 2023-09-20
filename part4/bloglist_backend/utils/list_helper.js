const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0);

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return {};
  else {
    const blogWithMaxLikes = blogs.reduce(
      (blogWithMaxLikes, blog) =>
        blog.likes > blogWithMaxLikes.likes ? blog : blogWithMaxLikes,
      { likes: 0 }
    );
    return {
      title: blogWithMaxLikes.title,
      author: blogWithMaxLikes.author,
      likes: blogWithMaxLikes.likes,
    };
  }
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {};

  const authorsWithNumberOfBlogs = {};
  blogs.forEach((blog) => {
    if (authorsWithNumberOfBlogs[blog.author])
      authorsWithNumberOfBlogs[blog.author]++;
    else authorsWithNumberOfBlogs[blog.author] = 1;
  });

  const topAuthor = Object.keys(authorsWithNumberOfBlogs).reduce(
    (topAuthor, author) =>
      authorsWithNumberOfBlogs[topAuthor] > authorsWithNumberOfBlogs[author]
        ? topAuthor
        : author
  );
  return { author: topAuthor, blogs: authorsWithNumberOfBlogs[topAuthor] };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return {};

  const authorsWithNumberOfLikes = {};
  blogs.forEach((blog) => {
    if (authorsWithNumberOfLikes[blog.author])
      authorsWithNumberOfLikes[blog.author] += blog.likes;
    else authorsWithNumberOfLikes[blog.author] = blog.likes;
  });

  const topAuthor = Object.keys(authorsWithNumberOfLikes).reduce(
    (topAuthor, author) =>
      authorsWithNumberOfLikes[topAuthor] > authorsWithNumberOfLikes[author]
        ? topAuthor
        : author
  );
  return { author: topAuthor, likes: authorsWithNumberOfLikes[topAuthor] };
};

module.exports = {
  favoriteBlog,
  totalLikes,
  mostBlogs,
  mostLikes,
};
