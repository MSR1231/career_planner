import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const translations = {
  en: {title:"Career Advisor", description:"Guiding students to the future and motivating them.", btnQuiz:"Take Career Quiz", btnColleges:"Find Nearby Colleges", btnCareers:"Explore Career Paths"},
  hi: {title:"कैरियर सलाहकार", description:"छात्रों को भविष्य के लिए मार्गदर्शन और प्रेरित करना।", btnQuiz:"कैरियर क्विज़ लें", btnColleges:"नजदीकी कॉलेज खोजें", btnCareers:"कैरियर विकल्प एक्सप्लोर करें"},
  ur: {title:"کیریئر ایڈوائزر", description:"طلباء کو مستقبل کے لیے رہنمائی اور ترغیب دینا۔", btnQuiz:"کریئر کوئز کریں", btnColleges:"قریبی کالجز تلاش کریں", btnCareers:"کریئر کے راستے دریافت کریں"}
};
function setLang(lang) {
  document.documentElement.lang = lang;
  const tr = translations[lang];
  document.getElementById("hero-title").textContent = tr.title;
  document.getElementById("hero-description").textContent = tr.description;
  document.getElementById("btn-quiz").textContent = tr.btnQuiz;
  document.getElementById("btn-colleges").textContent = tr.btnColleges;
  document.getElementById("btn-careers").textContent = tr.btnCareers;
}

const HomePage = () => {
  useEffect(() => {
    const track = document.getElementById("sliderTrack");
    if (!track) return;
    const totalImages = track.children.length;
    const imageWidth = 500;
    let index = 0;
    const slide = () => {
      index = (index + 1) % totalImages;
      track.style.transform = `translateX(-${index * imageWidth}px)`;
    };
    const interval = setInterval(slide, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      {/* Hero Section */}
      <section className="hero d-flex align-items-center text-center" style={{ padding: "60px 0" }}>
        <div className="container">
          <h1 className="display-4" id="hero-title">Career Advisor</h1>
          <p className="lead mt-3" id="hero-description">Guiding students to the future and motivating them.</p>
          <div className="mt-4" id="hero-buttons">
            <Link to="/quiz" className="btn btn-lg btn-success me-3" id="btn-quiz">Take Career Quiz</Link>
            <Link to="/colleges" className="btn btn-lg btn-success me-3" id="btn-colleges">Find Nearby Colleges</Link>
            <Link to="/dashboard" className="btn btn-lg btn-success me-3" id="btn-careers">Explore Career Paths</Link>
          </div>
        </div>
      </section>
      <div className="my-5"></div>
      {/* Image Slider */}
      <div style={{ textAlign: "center" }}>
        <div className="slider">
          <div className="slider-track" id="sliderTrack">
            <img src="/kashmir-school-7592.avif" alt="Image 1" width="400" height="200" />
            <img src="/2.jpg" alt="Image 2" width="600" height="200" className="rotated-270" />
            <img src="/3.avif" alt="Image 3" width="600" height="200" />
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="footer bg-light text-center py-3 mt-5"><p className="mb-0">&copy; 2025 EduGuide. Empowering Students for Better Futures.</p></footer>
      {/* Navbar Language Dropdown */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <span className="navbar-brand">EduGuide</span>
          <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="languageDropdown" data-bs-toggle="dropdown" aria-expanded="false">
              Language
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="languageDropdown">
              <li><button className="dropdown-item" data-lang="en" onClick={() => setLang("en")}>English</button></li>
              <li><button className="dropdown-item" data-lang="hi" onClick={() => setLang("hi")}>Hindi</button></li>
              <li><button className="dropdown-item" data-lang="ur" onClick={() => setLang("ur")}>Urdu</button></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default HomePage;