import React from "react";
import "./About.css";
import theme_pattern from "../../assets/theme_pattern.svg";
import profile_img from "../../assets/1758554028695.png";

function About() {
  const skills = [
    { name: "HTML & CSS", width: "95%" },
    { name: "JavaScript", width: "90%" },
    { name: "React", width: "90%" },
    { name: "MySQL & MongoDB", width: "95%" },
    { name: "Node.js & Express.js", width: "92.5%" },
    { name: "Bootstrap & Tailwind", width: "90%" },
  ];

  return (
    <div className="about" id="about">
      <div className="about-title">
        <h1>About me</h1>
        <img src={theme_pattern} alt="Theme pattern" />
      </div>
      <div className="about-sections">
        <div className="about-left">
          <img src={profile_img} alt="Profile" />
        </div>
        <div className="about-right">
          <div className="about-para">
            <p>I am a Fresher Full Stack Web developer.</p>
            <p>
              My passion for frontend development is reflected in the enthusiasm
              and dedication I bring to every project, as I continuously learn
              and grow through hands-on experience and creative problem-solving.
            </p>
          </div>
          <div className="about-skills">
            {skills.map((skill, index) => (
              <div className="about-skill" key={index}>
                <p>{skill.name}</p>
                <div className="skill-bar-container">
                  <div 
                    className="skill-bar"
                    style={{ width: skill.width }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;