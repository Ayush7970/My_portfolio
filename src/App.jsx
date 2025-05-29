import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Skill from './components/Skills';
import Hackathon from './components/hackathon'; // Create this if not present
import './App.css';
// import { Contact } from 'lucide-react';
import Contact from './components/Contact';
import Footer from './components/Footer';

import Experience from './components/ExperienceSection';
import Projects from './components/Projects';
import Activities from './components/Leadership'; // Create this if not present

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
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/activities" element={<Activities />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}


export default App;
