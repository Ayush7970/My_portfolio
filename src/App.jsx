import React from 'react';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Skill from './components/Skills';
import './App.css';
// import { Contact } from 'lucide-react';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <About />
      <Portfolio />
      <Skill />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
