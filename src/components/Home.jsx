import React, { useState } from "react";
import "./Home.css";
import { AnimatePresence, motion } from "framer-motion";
import Login from "./Login";
import Schools from "./Schools";
import SchoolDetails from "./SchoolDetails";
import arrow from "./arrow.png";
import students from "./students.webp";
import reading from "./reading.jpg";
import Registration from "./Registration-Easy.webp";
import reviews from "./reviews.jpg";
import Footer from "./Footer";


const Home = ({setCurrentPage}) => { 
  const [ schools, setSchools] = useState(Schools);
  const [selectedSchool, setSelectedSchool] = useState(null); // ✅ define this

  // ⭐ Handle Star Rating
  const handleStarClick = (schoolId, starIndex) => {
    const updatedSchools = schools.map((school) => {
      if (school.id === schoolId) {
        return { ...school, rating: starIndex + 1 };
      }
      return school;
    });
    setSchools(updatedSchools);
  };

  return (
    <div className="home">
      <AnimatePresence mode="wait">
        {!selectedSchool ? (
          <motion.div
            key="schools"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
          >
            
            {/* 🟦 Hero Section */}
            <section className="hero-section">
            <div className="hero-img-layer hero-img2"></div>
            <div className="hero-img-layer hero-img3"></div>
             <div className="hero-img-layer hero-img4"></div>
              <div className="hero-content">
                <h1>Register with the Best <span>School</span> Near You</h1>
                <p>
                  Discover your child updates in our school information website and see his development, it makes its easier 
                  to access importantmaterials he needs in School
                </p>
                <div className="search-bar">
                  <p>Search and compare school centers in your area — easily,
                  quickly, and confidently</p>
                  <input
                    type="text"
                    placeholder="Search for a school or subject..."
                  />
                  <button>Search</button>
                </div>
              </div>
            </section>

            {/* 🟨 About Section */}
          
            <motion.section
  className="about-section"
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
>
              <motion.div
    className="about-text"
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, delay: 0.2 }}
  >
              <h2>Why Choose School <span>Finder?</span></h2>
              <p>
                This is a digital paltform designed to make it easier for a school to connect with their students by providing
                updates, assignments,school calenders,and academic information - all in one place.
              </p>
              <p><span className="login-link" onClick={() =>
              setCurrentPage("login")}> Learn More <img src={arrow} className="arrow-icon" />
              </span>
              </p></motion.div>
               <motion.img
    src={students}
    alt="picture of a student"
    className="student-image"
    initial={{ opacity: 0, x: 40 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: 0.3 }}
  />
</motion.section>
              <section className="features-section">
                <div className="features-grid">

                  <div className="feature-card">
                  <h3>🎯 Students Follow-up</h3>
                  <p>
                    This platform is built to support continuous student follow-up, ensuring that every learner receive 
                    the guidance and monitoring they need to suceed academically.
                  </p>
                  </div>
                  <img src={reading} alt="reading picture" className="reading-image" />
                </div>
                <div className="features-grid">
                <div className="feature-card">
                  <h3>⭐ Verified Reviews</h3>
                  <p>
                    We provide verified reviews based on student's academic performance, class participation, and assignments
                    records to ensure accuracy and reliability,its helps to show their classrom performance and true academic progress 
                  </p>
                  <img src={reviews} alt="review picture" className="review-image" />
                  </div>
                </div>
               <div className="features-grid">
                <div className="feature-card">
                  <h3>📱 Easy Registration</h3>
                  <p>
                    With our simplified registration process, students can create an account in a fast process, We designed a system with
                    accessibility and convenience in mind, ensuring that every user, regardless of experience, can register smoothly and begin
                    using the portal immediately.
                  </p>
                <img src={Registration} alt="registration-pic" className="pic-register" />
                </div>
                </div>
              </section>
            

            {/* 🟩 School List */}
            <div className="school-section">
              <h2>Top Schools Around You</h2>
              <div className="schools-slider">
                <div className="schools-track">
                {schools.map((school) => (
                  <div
                    key={school.id}
                    className="school-card"
                    onClick={() => setSelectedSchool(school)} // ✅ Go to details
                  >
                    <img
                      src={school.image}
                      alt={school.name}
                      className="school-img"
                    />
                    <h3>{school.name}</h3>
                    <p>
                      <strong>Location:</strong> {school.location}
                    </p>
                    <p>
                      <strong>Tuition:</strong> {school.tuition}
                    </p>
                    <p>{school.description}</p>
                    <button
  className="register-school-btn"
  onClick={(e) => {
    e.stopPropagation(); // prevent opening details
    window.open(school.Link, "_blank");
  }}
>
  Register School
</button>


                    {/* ⭐ Star Ratings */}
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`fa fa-star${
                            i < school.rating ? "" : "-o"
                          }`}
                          onClick={(e) => {
                            e.stopPropagation(); // prevent opening details
                            handleStarClick(school.id, i);
                          }}
                          style={{
                            cursor: "pointer",
                            color: i < school.rating ? "#FFD700" : "#ccc",
                            fontSize: "20px",
                            marginRight: "3px",
                          }}
                        ></i>
                      ))}
                    </div>
                  </div>
                ))}
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="details"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <SchoolDetails
              selectedSchool={selectedSchool}
              onBack={() => setSelectedSchool(null)} // ✅ back button handler
            />
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
};

export default Home;
