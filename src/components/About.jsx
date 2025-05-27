import React from 'react';
import { Code, Cpu, Globe, Lightbulb } from 'lucide-react';

const About = () => (
  <section id="about" className="about-section">
    <div className="about-container">
      <div className="about-title">
        <h2>
          About Me
          <span className="about-underline"></span>
        </h2>
      </div>
      <div className="about-content">
        <div className="about-text">
          <p>
            I'm a passionate Software Engineer with a strong focus on web development and machine learning.
            Currently pursuing my Bachelor's in Computer Science at the University of Illinois Chicago, I combine academic knowledge with practical experience to build innovative solutions.
          </p>
          <p>
            As a Lead Web Developer at UIC's Engineering Administration, I've honed my skills in creating responsive,
            user-friendly websites while implementing analytics solutions that drive measurable improvements in user engagement.
          </p>
          <p className="about-highlight">
            My experience as a Head Teaching Assistant has strengthened my ability to break down complex concepts, debug challenging code issues, and collaborate effectively with teams of varying technical backgrounds.
          </p>
        </div>
        <div className="about-cards">
          <div className="about-card">
            <Code className="about-card-icon" />
            <h3>Web Development</h3>
            <p>Building responsive, accessible, and performant web applications</p>
          </div>
          <div className="about-card">
            <Cpu className="about-card-icon" />
            <h3>Machine Learning</h3>
            <p>Creating intelligent systems with PyTorch and TensorFlow</p>
          </div>
          <div className="about-card">
            <Globe className="about-card-icon" />
            <h3>Backend Systems</h3>
            <p>Developing robust and scalable backend solutions</p>
          </div>
          <div className="about-card">
            <Lightbulb className="about-card-icon" />
            <h3>Problem Solving</h3>
            <p>Finding elegant solutions to complex challenges</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default About;
