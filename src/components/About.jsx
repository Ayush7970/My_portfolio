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
            Hey there! I'm Ayush Bhardwaj. I’m passionate about building code and creating
            impactful software solutions. My expertise is mainly in web development and
            agentic AI. I enjoy competitive programming, and most weekends you’ll find me
            at hackathons with a few late nights. I also love traveling across the United
            States to explore different universities and meet new people. Right now, I’m
            working on a startup idea that uses AI to boost productivity and streamline
            workflows.
          </p>
          <p>
            In the past, I worked as a Software Engineering Intern at Invision Capital,
            where I learned more about finance than I ever expected.
          </p>
          <p className="about-highlight">
            During my undergrad at the University of Illinois Chicago, I mostly taught
            Python and advanced data structures and algorithms. I worked as a Teaching
            Assistant and a Head Teaching Assistant for six semesters, and I completed my
            degree in three and a half years. Honestly, it flew by before I even realized
            it.
          </p>
        </div>

        <div className="about-cards">
          <div className="about-card">
            <Lightbulb className="about-card-icon" />
            <h3>Problem Solving</h3>
            <p>
              Huge fan of DSA. I love solving problems that push my brain to think on another level.
            </p>
          </div>

          <div className="about-card">
            <Cpu className="about-card-icon" />
            <h3>Agentic AI</h3>
            <p>
              Something I do for fun. I love working with LangChain and LangGraph and building
              different types of agents.
            </p>
          </div>
          
          <div className="about-card">
            <Code className="about-card-icon" />
            <h3>Web Development</h3>
            <p>Currently working on large-scale applications and how to build them efficiently</p>
          </div>

          

          <div className="about-card">
            <Globe className="about-card-icon" />
            <h3>Backend Systems</h3>
            <p>Developing robust and scalable backend solutions</p>
          </div>

          
        </div>
      </div>

    </div>
  </section>
);

export default About;
