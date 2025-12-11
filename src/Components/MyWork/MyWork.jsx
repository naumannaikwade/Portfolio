import React, { useState } from "react";
import "./MyWork.css";
import theme_pattern from '../../assets/theme_pattern.svg';
import mywork_data from "../../assets/mywork_data";

// Import React Icons
import { FaArrowRight, FaExternalLinkAlt, FaGithub, FaCalendarAlt } from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs';

function MyWork() {
  const [activeProject, setActiveProject] = useState(null);

  const handleLiveDemo = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleGithub = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const toggleProjectDetails = (projectId) => {
    setActiveProject(activeProject === projectId ? null : projectId);
  };

  return (
    <div className="mywork" id="work">
      <div className="mywork-title">
        <h1>My Projects</h1>
        <img src={theme_pattern} alt="Pattern decoration" />
        <p className="mywork-subtitle">Click on any project to view details</p>
      </div>
      
      <div className="mywork-container">
        {mywork_data.map((work) => (
          <div 
            className={`work-card ${activeProject === work.w_no ? 'active' : ''}`} 
            key={work.w_no}
            onClick={() => toggleProjectDetails(work.w_no)}
          >
            <div className="work-card-main">
              <div className="work-image-container">
                <img 
                  src={work.w_img} 
                  alt={work.w_name} 
                  className="work-image"
                  loading="lazy"
                />
                <div className="work-badge">
                  <span className="work-period">
                    <FaCalendarAlt className="calendar-icon" />
                    {work.w_period}
                  </span>
                </div>
              </div>
              
              <div className="work-info">
                <h3 className="work-title">{work.w_name}</h3>
                <p className="work-description">{work.w_desc}</p>
                
                <div className="work-tech-stack">
                  {work.w_tech.map((tech, index) => (
                    <span className="tech-tag" key={index}>{tech}</span>
                  ))}
                </div>
                
                <div className="work-links">
                  <button 
                    className="live-demo-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLiveDemo(work.w_live);
                    }}
                  >
                    <FaExternalLinkAlt />
                    Live Demo
                  </button>
                  <button 
                    className="github-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleGithub(work.w_github);
                    }}
                  >
                    <FaGithub />
                    GitHub
                  </button>
                </div>
              </div>
            </div>
            
            {/* Expanded Details */}
            <div className={`work-details ${activeProject === work.w_no ? 'expanded' : ''}`}>
              <div className="details-content">
                <h4>Key Features</h4>
                <ul className="features-list">
                  {work.w_features.map((feature, index) => (
                    <li key={index}>
                      <span className="feature-bullet">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="project-links-full">
                  <a 
                    href={work.w_live} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaExternalLinkAlt />
                    <div>
                      <span className="link-label">Live Demo</span>
                      <span className="link-url">{work.w_live.replace('https://', '')}</span>
                    </div>
                  </a>
                  <a 
                    href={work.w_github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaGithub />
                    <div>
                      <span className="link-label">Source Code</span>
                      <span className="link-url">{work.w_github.replace('https://github.com/', '')}</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mywork-cta">
        <p>Want to see more projects or collaborate?</p>
        <button 
          className="mywork-showmore"
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span>Let's Connect</span>
          <BsArrowRight />
        </button>
      </div>
    </div>
  );
}

export default MyWork;