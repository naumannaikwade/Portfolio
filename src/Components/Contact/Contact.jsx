import React, { useState, useCallback, useMemo, useRef, useEffect } from "react";
import "./Contact.css";
import theme_pattern from "../../assets/theme_pattern.svg";
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaPaperPlane, 
  FaUser,
  FaCheckCircle,
  FaExclamationCircle
} from 'react-icons/fa';
import { MdMessage } from 'react-icons/md';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);
  const [charCount, setCharCount] = useState(0);
  
  const formRef = useRef(null);
  const MESSAGE_MAX_LENGTH = 500;

  // Get API key from environment variable with Vite prefix
  const WEB3FORMS_API_KEY = import.meta.env.VITE_WEB3FORMS_API_KEY;

  // Validate email format
  const validateEmail = useCallback((email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }, []);

  // Update character count
  useEffect(() => {
    setCharCount(formData.message.length);
  }, [formData.message]);

  // Get character counter class based on remaining characters
  const getCharCounterClass = useCallback(() => {
    const remaining = MESSAGE_MAX_LENGTH - charCount;
    if (remaining <= 0) {
      return "error";
    } else if (remaining <= 50) {
      return "warning";
    }
    return "";
  }, [charCount]);

  // Form validation
  const validateForm = useCallback(() => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    } else if (formData.message.length > MESSAGE_MAX_LENGTH) {
      newErrors.message = `Message must be ${MESSAGE_MAX_LENGTH} characters or less`;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, validateEmail]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    
    // Limit message length
    if (name === "message" && value.length > MESSAGE_MAX_LENGTH) {
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  }, [errors]);

  const handleFocus = useCallback((fieldName) => {
    setFocusedField(fieldName);
  }, []);

  const handleBlur = useCallback((fieldName) => {
    setFocusedField(null);
    // Validate on blur
    if (formData[fieldName]) {
      if (fieldName === 'email' && !validateEmail(formData.email)) {
        setErrors(prev => ({
          ...prev,
          [fieldName]: "Please enter a valid email"
        }));
      } else if (fieldName === 'message' && formData.message.trim().length < 10) {
        setErrors(prev => ({
          ...prev,
          [fieldName]: "Message must be at least 10 characters"
        }));
      }
    }
  }, [formData, validateEmail]);

  const onSubmit = useCallback(async (event) => {
    event.preventDefault();
    
    if (!validateForm()) {
      // Focus on first error field
      const firstError = Object.keys(errors)[0];
      if (firstError && formRef.current) {
        const errorElement = formRef.current.querySelector(`[name="${firstError}"]`);
        if (errorElement) {
          errorElement.focus();
        }
      }
      return;
    }
    
    setIsSubmitting(true);
    setResult("Sending...");
    
    try {
      // Check if API key is available
      if (!WEB3FORMS_API_KEY) {
        throw new Error("Contact form configuration error. Please try again later.");
      }
      
      const form = event.target;
      const formDataObj = new FormData(form);
      
      // Add form data
      formDataObj.append("name", formData.name);
      formDataObj.append("email", formData.email);
      formDataObj.append("message", formData.message);
      
      // Use the API key from environment variable
      formDataObj.append("access_key", WEB3FORMS_API_KEY);
      formDataObj.append("subject", "New Contact Form Submission from Portfolio");
      formDataObj.append("from_name", formData.name);
      formDataObj.append("reply_to", formData.email);
      
      // Optional: Add additional fields for better tracking
      formDataObj.append("botcheck", ""); // For bot detection
      formDataObj.append("redirect", "false");
      
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataObj,
        headers: {
          'Accept': 'application/json',
        }
      });

      const data = await response.json();

      if (data.success) {
        setResult("Message sent successfully! I'll get back to you soon.");
        setFormData({ name: "", email: "", message: "" });
        setErrors({});
        setFocusedField(null);
        setCharCount(0);
      } else {
        setResult(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setResult("Failed to send message. Please try again or contact me directly.");
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm, errors, WEB3FORMS_API_KEY]);

  const contactInfo = useMemo(() => [
    {
      icon: FaEnvelope,
      title: "Email",
      content: "naumannaikwade25@gmail.com",
      link: "mailto:naumannaikwade25@gmail.com",
      type: "email"
    },
    {
      icon: FaPhone,
      title: "Phone",
      content: "+91 8390935827",
      link: "tel:+918390935827",
      type: "phone"
    },
    {
      icon: FaMapMarkerAlt,
      title: "Location",
      content: "Maharashtra, India",
      type: "text"
    }
  ], []);

  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="contact-container">
        <div className="contact-title">
          <h1 id="contact-title">Get in touch</h1>
          <img 
            src={theme_pattern} 
            alt="Decorative pattern" 
            className="contact-pattern"
            loading="lazy"
            width={300}
            height={100}
          />
          <p className="contact-subtitle">Let's build something amazing together</p>
        </div>
        
        <div className="contact-section">
          <div className="contact-left">
            <div className="contact-header">
              <h1>Let's <span className="gradient-text">Connect</span></h1>
              <p>I'm currently available to take on new projects and collaborations. Feel free to reach out!</p>
            </div>
            
            <div className="contact-details" role="list">
              {contactInfo.map((item, index) => (
                <div key={index} className="contact-detail-card" role="listitem">
                  <div className="contact-icon-wrapper" aria-hidden="true">
                    <item.icon className="contact-icon" />
                  </div>
                  <div className="contact-info">
                    <h3>{item.title}</h3>
                    {item.type === 'email' || item.type === 'phone' ? (
                      <a 
                        href={item.link} 
                        className="contact-link"
                        aria-label={`Contact via ${item.type}: ${item.content}`}
                      >
                        {item.content}
                      </a>
                    ) : (
                      <p className="contact-text">{item.content}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="contact-availability">
              <div className="availability-dot" aria-hidden="true"></div>
              <p>Available for Internship opportunities</p>
            </div>
          </div>
          
          <div className="contact-right">
            <div className="contact-form-card">
              <div className="form-header">
                <MdMessage className="form-icon" aria-hidden="true" />
                <h2>Send me a message</h2>
              </div>
              
              <form 
                ref={formRef}
                className="contact-form" 
                onSubmit={onSubmit}
                noValidate
                aria-label="Contact form"
              >
                <div className="form-group">
                  <div className="label-wrapper">
                    <label htmlFor="name" className="form-label">
                      Name <span className="required">*</span>
                    </label>
                  </div>
                  <div className="input-wrapper">
                    <div className="input-icon" aria-hidden="true">
                      <FaUser />
                    </div>
                    <input 
                      id="name"
                      type="text" 
                      placeholder="Enter your name" 
                      name="name" 
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => handleFocus('name')}
                      onBlur={() => handleBlur('name')}
                      required 
                      className={`contact-input ${errors.name ? 'error' : ''} ${focusedField === 'name' ? 'focused' : ''}`}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      autoComplete="name"
                    />
                  </div>
                  {errors.name && (
                    <div id="name-error" className="error-message" role="alert">
                      <FaExclamationCircle /> {errors.name}
                    </div>
                  )}
                </div>
                
                <div className="form-group">
                  <div className="label-wrapper">
                    <label htmlFor="email" className="form-label">
                      Email <span className="required">*</span>
                    </label>
                  </div>
                  <div className="input-wrapper">
                    <div className="input-icon" aria-hidden="true">
                      <FaEnvelope />
                    </div>
                    <input 
                      id="email"
                      type="email" 
                      placeholder="Enter your email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => handleFocus('email')}
                      onBlur={() => handleBlur('email')}
                      required 
                      className={`contact-input ${errors.email ? 'error' : ''} ${focusedField === 'email' ? 'focused' : ''}`}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      autoComplete="email"
                    />
                  </div>
                  {errors.email && (
                    <div id="email-error" className="error-message" role="alert">
                      <FaExclamationCircle /> {errors.email}
                    </div>
                  )}
                </div>
                
                <div className="form-group">
                  <div className="label-wrapper">
                    <label htmlFor="message" className="form-label">
                      Message <span className="required">*</span>
                    </label>
                    <span className={`char-counter ${getCharCounterClass()}`}>
                      {charCount}/{MESSAGE_MAX_LENGTH}
                    </span>
                  </div>
                  <div className="input-wrapper">
                    <div className="input-icon textarea-icon" aria-hidden="true">
                      <MdMessage />
                    </div>
                    <textarea 
                      id="message"
                      placeholder="Enter your message here..." 
                      name="message" 
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => handleFocus('message')}
                      onBlur={() => handleBlur('message')}
                      maxLength={MESSAGE_MAX_LENGTH}
                      required 
                      className={`contact-textarea ${errors.message ? 'error' : ''} ${focusedField === 'message' ? 'focused' : ''}`}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "message-error" : undefined}
                    ></textarea>
                  </div>
                  <div className="textarea-info">
                    {errors.message && (
                      <div id="message-error" className="error-message" role="alert">
                        <FaExclamationCircle /> {errors.message}
                      </div>
                    )}
                  </div>
                </div>
                
                <button 
                  className={`contact-submit ${isSubmitting ? 'loading' : ''}`}
                  type="submit"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                >
                  <FaPaperPlane className="submit-icon" aria-hidden="true" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
                
                {result && (
                  <div 
                    className={`contact-result ${result.includes("successfully") ? "success" : "error"}`}
                    role="alert"
                    aria-live="polite"
                  >
                    {result.includes("successfully") ? (
                      <FaCheckCircle />
                    ) : (
                      <FaExclamationCircle />
                    )}
                    {result}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Contact);