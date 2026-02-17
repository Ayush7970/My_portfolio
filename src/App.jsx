import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Skill from './components/Skills';
import Hackathon from './components/hackathon'; // Create this if not present
import './App.css';
import './styles/Hero.css';
import './styles/About.css';
import './styles/PortfolioSection.css';
import './styles/SkillsSection.css';
import './styles/HackathonSection.css';
import './styles/Navbar.css';
import './styles/ProjectPage.css';
import './styles/ExperiencePage.css';
import './styles/LeadershipPage.css';
import './styles/ContactSection.css';
import MediumComingSoon from "./components/MediumComingSoon";


import Contact from './components/Contact';
import Footer from './components/Footer';
import CurrentPage from './components/CurrentPage';
import Experience from './components/ExperienceSection';
import Projects from './components/Projects';
import Activities from './components/Leadership'; // Create this if not present
import ScrollToTop from './components/ScrollToTop';

function Home() {
  return (
    <div className="App">
      <Hero />
      <About />
      <Portfolio />
      <Hackathon />
      <Skill />
      <Contact />
    </div>
  );
}


function App() {
  return (
    <Router>
      <ScrollToTop /> {/* ✅ FIRST */}
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/current" element={<CurrentPage />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/medium" element={<MediumComingSoon />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
