import React from "react";
import "./Hero.css";
import profileImg from "../../assets/1758554028695.png";
import AnchorLink from "react-anchor-link-smooth-scroll";

function Hero() {
  return (
    <div className="hero" id="home">
      <img src={profileImg} alt="Profile picture" className="profile-picture" />
      <h1>
        <span>Hello, I'm Nauman Naikwade.</span> Full Stack Developer based in
        India.
      </h1>
      <p>
        I'm a full-stack web developer—I build websites from scratch, handling
        everything from the design and user interface to the server and database
        behind the scenes.
      </p>
      <div className="hero-action">
        <div className="hero-connect">
          <AnchorLink className="anchor-link" href="#contact" offset={50}>
            Connect with Me
          </AnchorLink>
        </div>
        <div
          className="hero-resume"
          onClick={() => window.open("https://drive.google.com/file/d/17K7MsRnKvBq4WbNskJS5XqOXXVzrXTaH/view?usp=sharing", "_blank")}
        >
          My Resume
        </div>
      </div>
    </div>
  );
}

export default Hero;