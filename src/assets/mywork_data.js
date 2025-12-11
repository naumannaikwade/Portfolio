// mywork_data.js
import wanderlustImg from '../assets/wanderlust.png';
import xzerodhaImg from '../assets/xzerodha.jpg';
import xzoomImg from '../assets/xzoom.jpg';

const mywork_data = [
  {
    w_no: 1,
    w_name: "XZoom — Real-Time Conferencing Platform",
    w_img: xzoomImg,
    w_desc: "Developed a secure multi-user video conferencing system with WebRTC, screen sharing, draggable self-view (mobile), and host-controlled meeting termination. Added real-time chat and participant updates using Socket.io.",
    w_tech: ["WebRTC", "Socket.io", "React", "Node.js", "Express"],
    w_live: "https://xzoombynauman.onrender.com",
    w_github: "https://github.com/naumannaikwade/Zoom-Clone",
    w_period: "Oct 2025 – Nov 2025",
    w_features: [
      "Multi-user video conferencing",
      "Screen sharing",
      "Draggable self-view (mobile)",
      "Host-controlled meeting termination",
      "Real-time chat",
      "Participant updates"
    ]
  },
  {
    w_no: 2,
    w_name: "XZerodha — Stock Trading Platform",
    w_img: xzerodhaImg,
    w_desc: "Built a stock trading application with watchlists, positions, holdings, and funds. Integrated Finnhub API for real-time stock market data with session-based authentication and secure MongoDB transactions.",
    w_tech: ["React", "Node.js", "MongoDB", "Express", "Finnhub API", "Context API"],
    w_live: "https://xzerodhabynauman.onrender.com",
    w_github: "https://github.com/naumannaikwade/Zerodha-Clone",
    w_period: "Aug 2025 – Sep 2025",
    w_features: [
      "Stock watchlists",
      "Real-time market data",
      "Session-based authentication",
      "Secure transactions",
      "Responsive UI",
      "Global state with Context API"
    ]
  },
  {
    w_no: 3,
    w_name: "Wanderlustbnb — Property Listing Platform",
    w_img: wanderlustImg,
    w_desc: "Created a full-stack accommodation listing platform with MapTiler integration for map-based listings. Implemented authentication, image uploads, reviews, and full CRUD functionality.",
    w_tech: ["Node.js", "Express.js", "MongoDB", "EJS", "MapTiler", "Multer"],
    w_live: "https://wanderlustbnb.onrender.com",
    w_github: "https://github.com/naumannaikwade/Airbnb-Clone",
    w_period: "Apr 2025 – May 2025",
    w_features: [
      "Map-based property listings",
      "Image uploads",
      "User reviews",
      "Full CRUD operations",
      "User authentication",
      "Responsive design"
    ]
  }
];

export default mywork_data;