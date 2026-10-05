import express from "express";
import { createBlog, getBlogs } from "../controllers/blogController.js";
import { uploadBlogImage } from "../middlewares/upload.js";
import { adminOnly } from "../middlewares/adminOnly.js";

const router = express.Router();

router.get("/", getBlogs);

router.post(
  "/",
  adminOnly,
  uploadBlogImage.single("image"),
  createBlog
);


const express = require("express");
const {
  getBlogs,
  createBlog,
  deleteBlog,
  likeBlog,
} = require("../controllers/blogController");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");


router.get("/", getBlogs);
router.post("/", protect, adminOnly, createBlog);
router.delete("/:id", protect, adminOnly, deleteBlog);
router.post("/:id/like", protect, likeBlog);

export default router;
