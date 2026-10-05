import Blog from "../Blog.js";
const Blog = require("../Blog");

exports.getBlogs = async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
};

export const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    const image = req.file ? `/uploads/blogs/${req.file.filename}` : "";

    const blog = await Blog.create({
      title,
      content,
      image
    });

    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteBlog = async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: "Blog deleted" });
};

exports.likeBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  blog.likes += 1;
  await blog.save();
  res.json(blog);
};
