import mongoose from "mongoose"
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: String,
    image: {
      type:String,
      default:""
    },
    content: String,
    category: String,
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);


module.exports = mongoose.model("Blog", blogSchema);
