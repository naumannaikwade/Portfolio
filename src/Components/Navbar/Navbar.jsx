import React, { useState, useEffect } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.svg";
import underline from '../../assets/nav_underline.svg';
import AnchorLink from "react-anchor-link-smooth-scroll";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [menu, setMenu] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
    
    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleMenuClick = (menuItem) => {
    setMenu(menuItem);
    closeMenu();
    
    // Smooth scroll to section
    const element = document.getElementById(menuItem === 'home' ? 'home' : menuItem);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const navLinks = (
    <>
      <li>
        <button 
          className={`nav-link ${menu === "home" ? "active" : ""}`}
          onClick={() => handleMenuClick("home")}
        >
          Home
          {menu === "home" && <img src={underline} alt="Active indicator" className="nav-underline" />}
        </button>
      </li>
      <li>
        <button 
          className={`nav-link ${menu === "about" ? "active" : ""}`}
          onClick={() => handleMenuClick("about")}
        >
          About Me
          {menu === "about" && <img src={underline} alt="Active indicator" className="nav-underline" />}
        </button>
      </li>
      <li>
        <button 
          className={`nav-link ${menu === "services" ? "active" : ""}`}
          onClick={() => handleMenuClick("services")}
        >
          My Experience
          {menu === "services" && <img src={underline} alt="Active indicator" className="nav-underline" />}
        </button>
      </li>
      <li>
        <button 
          className={`nav-link ${menu === "work" ? "active" : ""}`}
          onClick={() => handleMenuClick("work")}
        >
          Portfolio
          {menu === "work" && <img src={underline} alt="Active indicator" className="nav-underline" />}
        </button>
      </li>
      <li>
        <button 
          className={`nav-link ${menu === "contact" ? "active" : ""}`}
          onClick={() => handleMenuClick("contact")}
        >
          Contact
          {menu === "contact" && <img src={underline} alt="Active indicator" className="nav-underline" />}
        </button>
      </li>
    </>
  );

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <img src={logo} alt="Logo" className="brand-logo" />
        
        <ul className="nav-menu desktop-menu">{navLinks}</ul>
        
        <div className="nav-connect desktop-menu">
          <button 
            className="connect-btn"
            onClick={() => handleMenuClick("contact")}
          >
            Connect with Me
          </button>
        </div>

        <button 
          className="hamburger-icon" 
          onClick={toggleMobileMenu} 
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div 
          className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}
          aria-hidden={!isMobileMenuOpen}
        >
          <div className="mobile-menu-header">
            <img src={logo} alt="Logo" className="mobile-logo" />
            <button 
              className="close-menu" 
              onClick={closeMenu} 
              aria-label="Close menu"
            >
              <FaTimes />
            </button>
          </div>
          
          <ul className="mobile-nav-links">{navLinks}</ul>
          
          <div className="nav-connect mobile-connect">
            <button 
              className="connect-btn"
              onClick={() => handleMenuClick("contact")}
            >
              Connect with Me
            </button>
          </div>
        </div>

        {/* Overlay for mobile menu */}
        {isMobileMenuOpen && (
          <div 
            className="menu-overlay" 
            onClick={closeMenu}
            aria-label="Close menu"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && closeMenu()}
          ></div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;