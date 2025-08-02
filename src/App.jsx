import React, { useState, useEffect } from "react";
const App = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const education = [
    {
      degree: "B.Tech in Computer Science & Engineering",
      institute: "Guru Nanak Dev Engineering College, Ludhiana",
      year: "2024 - 2027",
      percentage: "Pursuing",
    },
    {
      degree: "Diploma in Computer Science & Engineering",
      institute: "Guru Nanak Dev Polytechnic College, Ludhiana",
      year: "2022 - 2024",
      percentage: "82%",
    },
    {
      degree: "Diploma in ADCA (Advanced Diploma in Computer Applications)",
      institute: "Royal Computer And Coaching Institute, Ludhiana",
      year: "2021 - 2022",
      percentage: "78%",
    },
    {
      degree: "12th Non-Medical (PSEB)",
      institute: "S.D.P. Sen. Sec. School, Ludhiana",
      year: "2019 - 2021",
      percentage: "70%",
    },
    {
      degree: "10th (PSEB)",
      institute: "Sawan Sen. Sec. School, Ludhiana",
      year: "2018 - 2019",
      percentage: "67%",
    },
  ];

  const skills = [
    { name: "HTML", level: 90 },
    { name: "CSS", level: 85 },
    { name: "JavaScript", level: 80 },
    { name: "React", level: 75 },
    { name: "Node.js", level: 70 },
    { name: "MongoDB", level: 65 },
    { name: "MySQL", level: 70 },
    { name: "Git", level: 80 },
    { name: "C++", level: 85 },
    { name: "GSAP", level: 60 },
    { name: "Tailwind CSS", level: 85 },
    { name: "MS Office", level: 90 },
  ];

  const projects = [
    {
      id: 1,
      title: "E-Commerce Website",
      description: "A full-featured e-commerce platform built with MERN stack.",
      technologies: "React, Node.js, MongoDB",
      image: "/assets/project1.jpg",
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A productivity app for managing tasks and deadlines.",
      technologies: "React, Firebase",
      image: "/assets/project2.jpg",
    },
    {
      id: 3,
      title: "Portfolio Website",
      description: "A responsive portfolio website showcasing my work.",
      technologies: "React, Tailwind CSS",
      image: "/assets/project3.jpg",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "skills",
        "portfolio",
        "resume",
        "contact",
      ];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const scriptURL =
        "https://script.google.com/macros/s/AKfycbxibmkFXbjUZa1dH5wREEW-2QW-l2JL9ZTvzcogNp_5Q-63JOfkXkq2bz5a8tM7uT4/exec";

      const response = await fetch(scriptURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(formData),
      });

      const result = await response.json();
      if (result.status === "success") {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", mobile: "", message: "" });
      } else {
        alert("Error sending message. Please try again.");
        console.error("Error:", result.message);
      }
    } catch (error) {
      alert("Error sending message. Please try again.");
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }

        return prev + 10;
      });
    }, 200);

    const loadingTimer = setTimeout(() => {
      setLoading(false); // Hide loader when done
    }, 2500);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(loadingTimer);
    };
  }, []);
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          {/* Concentric Spinning Circles */}
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin"></div>
            <div className="absolute inset-2 rounded-full border-4 border-blue-500 border-t-transparent animate-spin animation-delay-150"></div>
            <div className="absolute inset-4 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin animation-delay-300"></div>
          </div>
          {/* Loader Text */}
          <h2 className="text-2xl font-bold text-white mb-2">
            Loading Portfolio
          </h2>
          <p className="text-gray-400 mb-4">Abhishek Singh Rajput</p>
          {/* Progress Bar */}
          <div className="w-64 h-2 bg-gray-700 rounded-full mx-auto overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          {/* Percentage Counter */}
          <p className="text-gray-500 text-sm mt-2">{progress}%</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white font-sans">
      {/* Navigation */}
      <nav className="fixed w-full bg-gray-900/90 backdrop-blur-sm z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                Abhishek Rajput
              </span>
            </div>
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {[
                "home",
                "about",
                "skills",
                "portfolio",
                "resume",
                "contact",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize font-medium transition-colors duration-300 ${
                    activeSection === item
                      ? "text-cyan-400 border-b-2 border-cyan-400"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {[
                "home",
                "about",
                "skills",
                "portfolio",
                "resume",
                "contact",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                    activeSection === item
                      ? "text-cyan-400 bg-gray-900"
                      : "text-gray-300 hover:text-white hover:bg-gray-700"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Hi, I'm{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                  Abhishek
                </span>
              </h1>
              <h2 className="text-2xl md:text-3xl text-cyan-400 mb-6">
                A Passionate Programmer
              </h2>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl">
                I'm an engineering student with a passion for technology,
                problem-solving, and innovation. I enjoy building real-world
                projects and continuously improving my skills.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <button
                  onClick={() => scrollToSection("portfolio")}
                  className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1"
                >
                  View My Work
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="px-6 py-3 bg-transparent border-2 border-cyan-600 text-cyan-400 hover:bg-cyan-600/10 rounded-lg font-medium transition-all"
                >
                  Contact Me
                </button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                {/* Animated background circles */}
                <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full opacity-80 animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-56 md:w-72 md:h-72 bg-gradient-to-tr from-blue-400 to-cyan-500 rounded-full opacity-60 animate-pulse animation-delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-44 h-44 md:w-60 md:h-60 bg-gradient-to-tl from-cyan-300 to-blue-400 rounded-full opacity-40 animate-pulse animation-delay-2000"></div>
                {/* Profile Image */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white">
                  <img
                    src="/assets/profileimg.png"
                    alt="Abhishek Rajput"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
            <div className="w-20 h-1 bg-cyan-500 mx-auto"></div>
          </div>
          {/* Removed lg:grid-cols-2 and the empty grid column div */}
          <div className="max-w-4xl mx-auto">
            <div>
              <p className="text-lg text-gray-300 mb-6 text-center">
                I'm an engineering student with a passion for technology,
                problem-solving, and innovation. I enjoy building real-world
                projects, learning new tools, and continuously improving my
                skills in programming and system design. With a strong
                foundation in core engineering principles, I'm focused on
                growing into a professional who can contribute to impactful tech
                solutions.
              </p>
              <div className="mt-8">
                <h3 className="text-2xl font-bold mb-6 text-center">
                  Education
                </h3>
                <div className="space-y-4">
                  {education.map((edu, index) => (
                    <div
                      key={index}
                      className="bg-gray-800/50 p-4 rounded-lg border border-gray-700"
                    >
                      <div className="flex justify-between flex-col sm:flex-row gap-2">
                        <h4 className="font-bold text-cyan-400">
                          {edu.degree}
                        </h4>
                        <span className="text-sm text-gray-400 sm:text-right">
                          {edu.year}
                        </span>
                      </div>
                      <p className="text-gray-300 mt-1">{edu.institute}</p>
                      {edu.percentage && (
                        <p className="text-sm text-cyan-300 mt-1">
                          {edu.percentage}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* The second grid column div is removed entirely */}
          </div>
        </div>
      </section>

      {/* Skills Section (Kept this one) */}
      <section id="skills" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Technical Skills
            </h2>
            <div className="w-20 h-1 bg-cyan-500 mx-auto"></div>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
              Here are the technologies and tools I've worked with in my
              projects
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 text-center hover:border-cyan-500 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-3xl mb-3 text-cyan-400">
                  {skill.name === "HTML" && <i className="fab fa-html5"></i>}
                  {skill.name === "CSS" && <i className="fab fa-css3-alt"></i>}
                  {skill.name === "JavaScript" && <i className="fab fa-js"></i>}
                  {skill.name === "React" && <i className="fab fa-react"></i>}
                  {skill.name === "Node.js" && (
                    <i className="fab fa-node-js"></i>
                  )}
                  {skill.name === "MongoDB" && (
                    <i className="fas fa-database"></i>
                  )}
                  {skill.name === "MySQL" && (
                    <i className="fas fa-database"></i>
                  )}
                  {skill.name === "Git" && <i className="fab fa-git-alt"></i>}
                  {skill.name === "C++" && (
                    <i className="fab fa-cuttlefish"></i>
                  )}
                  {skill.name === "GSAP" && <i className="fas fa-bolt"></i>}
                  {skill.name === "Tailwind CSS" && (
                    <i className="fas fa-wind"></i>
                  )}
                  {skill.name === "MS Office" && (
                    <i className="fas fa-file-word"></i>
                  )}
                </div>
                <h3 className="font-bold">{skill.name}</h3>
                <div className="mt-2 h-1 bg-gray-700 rounded-full">
                  <div
                    className="h-full bg-cyan-500 rounded-full"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              My Portfolio
            </h2>
            <div className="w-20 h-1 bg-cyan-500 mx-auto"></div>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
              Check out some of my recent projects and creations
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-cyan-500 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <span className="text-sm text-cyan-400 bg-cyan-900/30 px-3 py-1 rounded-full">
                    {project.technologies}
                  </span>
                  <h3 className="text-xl font-bold mt-3 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <button className="text-cyan-400 font-medium flex items-center group">
                    View Project
                    <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">My Resume</h2>
            <div className="w-20 h-1 bg-cyan-500 mx-auto"></div>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
              Download my resume to learn more about my professional background
            </p>
          </div>
          <div className="max-w-3xl mx-auto bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 text-center">
            <div className="w-24 h-24 bg-cyan-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-file-alt text-4xl text-cyan-400"></i>
            </div>
            <h3 className="text-2xl font-bold mb-4">
              Abhishek Rajput - Resume
            </h3>
            <p className="text-gray-400 mb-8">
              Download my complete resume to learn more about my education,
              skills, and experience.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {/* Example assuming your resume file is named Abhishek_Rajput_Resume.pdf and is inside the 'public' folder */}
              <a
                href="/assets/Abhishek_Singh_Resume.pdf" // <-- Update this filename/path
                target="_blank" // Opens the PDF in a new tab
                rel="noopener noreferrer" // Security best practice
                className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-lg font-medium flex items-center transition-all"
              >
                <i className="fas fa-eye mr-2"></i> View Resume
              </a>
              <a
                href="/assets/Abhishek_Singh_Resume.pdf" // <-- Update this filename/path
                download // Suggests downloading the file
                className="px-6 py-3 bg-transparent border-2 border-cyan-600 text-cyan-400 hover:bg-cyan-600/10 rounded-lg font-medium flex items-center transition-all"
              >
                <i className="fas fa-download mr-2"></i> Download Resume
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact Me</h2>
            <div className="w-20 h-1 bg-cyan-500 mx-auto"></div>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
              Have a project in mind or want to discuss opportunities? Feel free
              to reach out!
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="mobile" className="block text-gray-300 mb-2">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
            <div>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 h-full">
                <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-cyan-900/30 rounded-full flex items-center justify-center mr-4">
                      <i className="fas fa-map-marker-alt text-cyan-400 text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Location</h4>
                      <p className="text-gray-400">Ludhiana (141008), Punjab</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-cyan-900/30 rounded-full flex items-center justify-center mr-4">
                      <i className="fas fa-envelope text-cyan-400 text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Email</h4>
                      <p className="text-gray-400">
                        rajputabhishek5568@gmail.com
                      </p>{" "}
                      {/* Update with your email */}
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-cyan-900/30 rounded-full flex items-center justify-center mr-4">
                      <i className="fas fa-phone-alt text-cyan-400 text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Phone</h4>
                      <p className="text-gray-400">+91 7529036258</p>{" "}
                      {/* Update with your phone */}
                    </div>
                  </div>
                </div>
                <div className="mt-10">
                  <h4 className="font-bold text-lg mb-4">Connect With Me</h4>
                  <div className="flex space-x-4">
                    {/* Update these links with your actual profiles */}
                    <a
                      href="https://github.com/abhishekrajput55"
                      className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-cyan-600 transition-colors"
                      aria-label="GitHub"
                    >
                      <i className="fab fa-github"></i>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/abhishek-singh-97083a2a6"
                      className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-cyan-600 transition-colors"
                      aria-label="LinkedIn"
                    >
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a
                      href="https://x.com/AbhixRajput55"
                      className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-cyan-600 transition-colors"
                      aria-label="Twitter"
                    >
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a
                      href="https://www.instagram.com/iabhi.rajput/?hl=en"
                      className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-cyan-600 transition-colors"
                      aria-label="Instagram"
                    >
                      <i className="fab fa-instagram"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-2">Abhishek Rajput</h3>
              <p className="text-gray-400">Programmer & Engineering Student</p>
            </div>
            <div className="flex space-x-6">
              {/* Update these links with your actual profiles */}
              <a
                href="https://github.com/abhishekrajput55"
                className="text-gray-400 hover:text-white transition"
                aria-label="GitHub"
              >
                <i className="fab fa-github text-xl"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/abhishek-singh-97083a2a6"
                className="text-gray-400 hover:text-white transition"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin text-xl"></i>
              </a>
              <a
                href="https://x.com/AbhixRajput55"
                className="text-gray-400 hover:text-white transition"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a
                href="mailto:rajputabhishek5568@gmail.com"
                className="text-gray-400 hover:text-white transition"
                aria-label="Email"
              >
                <i className="fas fa-envelope text-xl"></i>
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500 text-sm">
            <p>
              &copy; {new Date().getFullYear()} Abhishek Rajput. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
