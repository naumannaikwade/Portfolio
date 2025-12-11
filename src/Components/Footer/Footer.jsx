import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <h2 className="footer-tagline">
          Made with <span role="img" aria-label="heart" className="orange-heart">🧡</span> by Nauman
        </h2>
        {/* <p className="footer-copy">
          &copy; {new Date().getFullYear()} Nauman Naikwade. All rights reserved.
        </p> */}
      </div>
    </footer>
  );
}

export default Footer;
