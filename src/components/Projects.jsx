import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Code, Award, Calendar } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import TechCarousel from './TechCarousel';


const projects = [
  {
    title: 'Tariffarm',
    description: 'Tariffarm is a full-stack international trade platform that helps users estimate import costs with real-time tariff data. It integrates Flask and React.js for a seamless frontend-backend experience. Interactive trade route maps and Gemini API prompts enhance usability.',
    image: 'https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tags: ['React', 'Flask', 'Python', 'JavaScript'],
    code: 'https://github.com/Ayush7970/tariffarm',
    demo: 'https://www.youtube.com/watch?v=bZZq8BTu3Vk',
    date: 'April 2025',
    award: true
  },
  {
    title: 'Super Health App',
    description: 'An advanced desktop health assistant built using Python, Tkinter, and SQLite. The app helps track prescriptions, set medication reminders, and locate doctors. It combines mindfulness tools for a holistic health management solution.',
    image: 'https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tags: ['Python', 'Tkinter', 'SQLite'],
    code: 'https://github.com/Ayush7970/super-health-app',
    demo: 'https://www.youtube.com/watch?v=KmfvAucKpX0&t=1s',
    date: 'February 2024',
    award: true
  },
  {
    title: 'KafNodeX',
    description: 'A real-time Go API using Kafka and WebSockets to stream and process live data. It provides efficient message handling with unique stream sessions. Designed for high scalability and low-latency data delivery.',
    image: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tags: ['Go', 'Kafka', 'WebSockets'],
    code: 'https://github.com/Ayush7970/kafnodex',
    demo: 'https://www.youtube.com/watch?v=nFcyoE-wzFg',
    date: 'April 2025'
  },
  {
    title: 'Sustainable AI Farming Assistant',
    description: 'A smart farming assistant that offers AI-based disaster predictions and real-time alerts. Built using React, Flask, and ML models to empower farmers. The platform integrates Ollama chatbot for interactive farming advice.',
    image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&fit=crop&w=800&q=80',
    tags: ['React', 'Flask', 'ML', 'Ollama', 'AI'],
    code: 'https://github.com/Ayush7970/sparkshacks_teamAI',
    demo: 'https://www.youtube.com/watch?v=ppVIs93FwGI',
    date: 'February 2024'
  },
  {
    title: 'ChatNexus',
    description: 'A GPT-based character-level language model built with PyTorch. The app implements transformer blocks and multi-head attention. It generates high-quality text predictions for various NLP tasks.',
    image: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tags: ['Python', 'PyTorch', 'ML'],
    code: 'https://github.com/Ayush7970/chat-nexus',
    date: 'July 2024'
  },
  {
    title: 'Finance Visualizer',
    description: 'A full-stack finance tracking app with React, Next.js, Flask, and Three.js. It provides budget analysis, expense visualizations, and loan management. The 3D dashboards deliver engaging financial insights.',
    image: 'https://images.pexels.com/photos/6693657/pexels-photo-6693657.jpeg?auto=compress&fit=crop&w=800&q=80',
    tags: ['React', 'Next.js', 'Flask', 'Three.js', 'MySQL'],
    code: 'https://github.com/Ayush7970/uncommon_repo1',
    date: 'March 2024'
  },
  {
    title: 'FactoryPlus',
    description: 'An IoT system for conveyor belt monitoring using Arduino and sensors. It provides safety monitoring, product tracking, and smart control features. Real-time alerts help improve factory productivity and safety.',
    image: 'https://images.pexels.com/photos/256369/pexels-photo-256369.jpeg?auto=compress&fit=crop&w=800&q=80',
    tags: ['Arduino', 'IoT', 'Embedded', 'Sensors'],
    code: 'https://github.com/Ayush7970/factoryplus',
    date: 'December 2024'
  },
  {
    title: 'Demo AlgoLearn',
    description: 'AlgoLearn is a platform to learn and visualize algorithms interactively. It provides live coding examples and step-by-step walkthroughs. The app is designed for students and educators alike.',
    image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&fit=crop&w=800&q=80',
    tags: ['React', 'Next.js', 'Algorithms', 'Education'],
    code: 'https://github.com/Ayush7970/algoLearn',
    demo: 'https://algo-learn-neon.vercel.app/',
    date: 'June 2025'
  },
  {
    title: 'VectorDriveAI',
    description: 'An AI-based document search tool using GPT models and PostgreSQL vector storage. Integrates Google Drive for document management. It supports natural language queries with fast, scalable retrieval.',
    image: 'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&fit=crop&w=800&q=80',
    tags: ['Python', 'PyTorch', 'PostgreSQL', 'Google Drive', 'Ollama'],
    code: 'https://github.com/Ayush7970/VectorDriveAI',
    date: 'May 2024'
  },
  {
    title: 'MEasily (AI Health & Mapping)',
    description: 'A web app to assess measles risk using AI-driven text, audio, and image inputs. It generates real-time community heatmaps. Built for hackathons, the app focuses on health and safety mapping.',
    image: 'https://images.pexels.com/photos/3952236/pexels-photo-3952236.jpeg?auto=compress&fit=crop&w=800&q=80',
    tags: ['React', 'Flask', 'Groq', 'Gemini', 'Google Maps'],
    code: 'https://github.com/vyomshah05/MEasily',
    date: 'January 2024'
  },
  {
    title: 'Aahar',
    description: 'Aahar is a web platform to reduce food waste by allowing restaurants to list surplus food. It uses dynamic charts and local storage for data persistence. The app emphasizes usability and user feedback.',
    image: 'https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&fit=crop&w=800&q=80',
    tags: ['HTML', 'CSS', 'JavaScript', 'Chart.js'],
    code: 'https://github.com/Ayush7970/422_Aahar',
    demo: 'https://shailp200.github.io/422_Aahar/',
    date: 'December 2023'
  }
];


  

// Extract tags dynamically
const allTags = ['All Projects', ...Array.from(new Set(projects.flatMap(p => p.tags)))];

const Projects = () => {
  const [filter, setFilter] = useState('All Projects');
  const [filtered, setFiltered] = useState(projects);
  const sectionRef = useRef(null);

  useEffect(() => {
    setFiltered(
      filter === 'All Projects'
        ? projects
        : projects.filter(p => p.tags.includes(filter))
    );
  }, [filter]);

  useEffect(() => {
    // Animate cards in on scroll
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('scale-in');
            }, i * 100);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    const cards = sectionRef.current?.querySelectorAll('.project-card');
    cards?.forEach((el) => observer.observe(el));
    return () => cards?.forEach((el) => observer.unobserve(el));
  }, [filtered]);

  return (
    <section id="projects" ref={sectionRef} className="section" style={{ minHeight: '100vh' }}>
      <div className="container">
      <h2 className="portfolio-title" style={{
            textAlign: 'center',
            fontWeight: 900,
            fontSize: '2.2rem',
            marginBottom: '0.25rem'
            }}>
            Projects </h2>
            <span className="projects-section-underline"></span>
            <div className="exp-typing">
            <TypeAnimation
                sequence={[
                    "Transforming ideas into impactful projects.", 1500,
                    "",
                    400,
                    "Building solutions, one project at a time.", 1500,
                    "",
                    400,
                    "From hackathons to real-world apps.", 1500,
                    "",
                    400,
                    "Innovating with every line of code.", 1500,
                    "",
                    400,
                    "Showcasing creativity through technology.", 1500,
                    "",
                    400,
                  ]}
                wrapper="span"
                speed={45}
                repeat={Infinity}
                cursor={true}
            />
            </div>

        <div className="mb-8 flex flex-wrap justify-center gap-2" style={{ marginBottom: 30 }}>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`filter-btn${filter === tag ? ' active' : ''}`}
              style={{
                background: filter === tag ? 'hsl(220,95%,21%)' : 'transparent',
                color: filter === tag ? '#fff' : '#b1b8c9',
                border: filter === tag ? '2px solid hsl(220,95%,21%)' : '1.5px solid #2c3141',
                padding: '10px 22px',
                borderRadius: 24,
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: 17,
                transition: 'all 0.17s'
              }}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 440px))',
          gap: '2.2rem',
          justifyContent: 'center',
          
        }}>
          {filtered.map((project, i) => (
            <div key={i} className="project-card" style={{
              background: '#232937',
              borderRadius: 18,
              boxShadow: '0 3px 24px rgba(0,0,0,0.18)',
              padding: '0 0 18px 0',
              display: 'flex',
              flexDirection: 'column',
              transition: 'box-shadow 0.18s, transform 0.18s',
              cursor: 'pointer'
            }}>
              <div className="project-card-image" style={{
                borderTopLeftRadius: 18,
                borderTopRightRadius: 18,
                overflow: 'hidden',
                marginBottom: 18
              }}>
                <img
                  src={project.image}
                  alt={project.title}
                  style={{
                    width: '100%',
                    height: 170,
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </div>
              <div style={{ padding: '0 1.3rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  marginBottom: 6,
                  color: '#fff'
                }}>{project.title}</h3>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: 15,
                  color: '#b1b8c9',
                  marginBottom: 10
                }}>
                  <Calendar size={15} style={{ marginRight: 4, marginTop: -2 }} />
                  <span>{project.date}</span>
                  {project.award && (
                    <span style={{
                      color: '#FF9800',
                      fontWeight: 600,
                      marginLeft: 13,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4
                    }}>
                      <Award size={15} style={{ marginRight: 3 }} />
                      Hackathon Winner
                    </span>
                  )}
                </div>
                <p style={{
                  color: '#b1b8c9',
                  fontSize: 15.3,
                  marginBottom: 13,
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 3,
                  overflow: 'hidden'
                }}>{project.description}</p>

                <TechCarousel tags={project.tags} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 15 }}>
                {project.code && (
                  <a
                    href={project.code}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#3faaff',
                      display: 'inline-flex',
                      alignItems: 'center',
                      fontWeight: 600,
                      textDecoration: 'none',
                      fontSize: 15,
                      transition: 'color 0.14s'
                    }}
                  >
                    <Code size={17} style={{ marginRight: 6 }} />
                    View Code
                  </a>
                )}

                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#3faaff',
                      display: 'inline-flex',
                      alignItems: 'center',
                      fontWeight: 600,
                      textDecoration: 'none',
                      fontSize: 15,
                      transition: 'color 0.14s'
                    }}
                  >
                    <ExternalLink size={17} style={{ marginRight: 6 }} />
                    Live Demo
                  </a>
                )}
              </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
