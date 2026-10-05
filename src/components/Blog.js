import React, { useState, useEffect } from "react";
import "./Blog.css";
import blogData from "./blogData";
import bestschools from "./bestschools.jpg";
import Footer from "./Footer";

const Blog = () => {
  const [blogs, setBlogs] = useState(blogData);

useEffect(() => {
  const savedBlogs = JSON.parse(localStorage.getItem("blogs"));
  setBlogs(savedBlogs && savedBlogs.length > 0 ? savedBlogs : blogData);
}, []);


  // ❤️ LIKE FUNCTION
  const handleLike = (id) => {
    const updatedBlogs = blogs.map((blog) =>
      blog.id === id
        ? {
            ...blog,
            liked: !blog.liked,
            likes: blog.liked ? blog.likes - 1 : blog.likes + 1,
          }
        : blog
    );
    setBlogs(updatedBlogs);
  };

  const handleShare = async (blog) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: blog.title,
          text: blog.description,
          url: blog.link,
        });
      } else {
        navigator.clipboard.writeText(blog.link);
        alert("Link copied!");
      }
    } catch (error) {
      console.log("Share failed", error);
    }
  };

  // Group blogs
  const education = blogs.filter((b) => b.id >= 1 && b.id <= 5);
  const scholarships = blogs.filter((b) => b.id >= 6 && b.id <= 10);
  const lifestyle = blogs.filter((b) => b.id >= 11 && b.id <= 15);

  const sections = [
    { title: "Education", data: education },
    { title: "Scholarships", data: scholarships },
    { title: "Lifestyle", data: lifestyle },
  ];

  return (
    <div className="blog-wrapper">
      <div className="blogs-header">
        <h1 className="blog-text">
          Read latest blogs and news relating to education, opportunities,
          educational events, and curriculum in Nigeria.
        </h1>
      </div>
<img src={bestschools} className="image-school" alt="students" />

      {sections.map((section, index) => (
        <div key={index} className="blog-section">
          <h2 className="section-title">{section.title}</h2>

          

          <div className="blog-grid">
            {section.data.map((blog) => (
              <div
                key={blog.id}
                className="blog-card"
                onClick={() => window.open(blog.link, "_blank")}
              >

                  <img src={blog.image} alt={blog.title} className="blog-img" />
                  <h3>{blog.title}</h3>
                  <p className="blog-desc">{blog.description}</p>
                  <p className="blog-content">
  {blog.content ? blog.content.slice(0, 120) : ""}...
</p>


                <div
                  className="blog-actions"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="like-btn"
                    onClick={() => handleLike(blog.id)}
                  >
                    ❤️ {blog.likes}
                  </button>

                  <button
                    className="share-btn"
                    onClick={() => handleShare(blog)}
                  >
                    🔗 Share
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <Footer />
    </div>
  );
};

export default Blog;
