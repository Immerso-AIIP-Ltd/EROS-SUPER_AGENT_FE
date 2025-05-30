import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import local images (make sure they exist in your project)
import video from './video.jpg';
import image from './images.jpg';

const ImageGenerationDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('image-studio');

  const sidebarItems = [
    { id: 'home', label: 'Home', icon: '', path: '/home' },
    { id: 'ai-chat', label: 'AI Chat', icon: '', path: '/' },
    { id: 'image-studio', label: 'Image Studio', icon: '', path: '/image-studio' },
    { id: 'video-generations', label: 'Video Generations', icon: '', path: '/video' },
    { id: 'all-agents', label: 'All Agents', icon: '', path: '/agent' },
    { id: 'eternal', label: 'Eternal Agent', icon: '', path: '/eternal' },
    { id: 'health', label: 'Health Agent', icon: '', path: '/health' },
  ];

  const imageGenerationTools = [
    {
      title: "Generate Image",
      icon: "🎨",
      image: image
    },
    {
      title: "Image to Video",
      icon: "🎬",
      image: video
    }
  ];

  return (
    <div className="d-flex min-vh-100" style={{ backgroundColor: '#ffffff', color: '#000000', fontFamily: "'Poppins', sans-serif" }}>
      
      {/* Sidebar */}
      <div
        className="bg-white border-end"
        style={{
          width: '250px',
          minHeight: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          zIndex: 100,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)'
        }}
      >
        <div className="p-3">
          {/* Gradient Header */}
          <div className="d-flex align-items-center mb-4">
            <h1
              className="mb-0 fw-bold"
              style={{
                color: 'transparent',
                backgroundImage: 'linear-gradient(90deg, #A1DE2F, #00A3FF)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                display: 'inline-block',
                fontSize: '1.3rem',
                fontFamily: "'Poppins', sans-serif"
              }}
            >
              EROS SUPER AGENT
            </h1>
          </div>

          {/* Sidebar Navigation */}
          <nav className="nav nav-pills flex-column">
            {sidebarItems.map((item) => {
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  className={`nav-link text-start mb-1 ${isActive ? 'text-black' : 'text-black opacity-75'}`}
                  onClick={() => {
                    setActiveSection(item.id);
                    if (item.path) {
                      navigate(item.path);
                    }
                  }}
                  style={{
                    backgroundColor: isActive ? '#f1f1f1' : 'transparent',
                    border: 'none',
                    transition: 'all 0.2s ease',
                    fontFamily: "'Poppins', sans-serif"
                  }}
                >
                  <span className="me-2">{item.icon}</span>
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div
        className="flex-grow-1 p-4"
        style={{
          marginLeft: '250px',
          backgroundColor: '#ffffff',
          fontFamily: "'Poppins', sans-serif"
        }}
      >
        {/* Section Title */}
        <div className="mb-4">
          <h1 className="text-black mb-0">Image Generation</h1>
        </div>

        {/* Image Tools Grid */}
        <div className="row g-2 mb-5">
          {imageGenerationTools.map((tool, index) => (
            <div key={index} className="col-6 col-md-6 col-lg-2 mb-4 d-flex justify-content-center">
              <div className="card h-100" style={{
                backgroundColor: '#ffffff',
                border: '1px solid #ddd'
              }}>
                <div className="position-relative">
                  <img
                    src={tool.image}
                    alt={tool.title}
                    className="card-img-top"
                    style={{
                      height: '200px',
                      width: '200px',
                      objectFit: 'cover',
                      margin: '0 auto',
                      display: 'block'
                    }}
                  />
                  <div className="position-absolute top-0 end-0 p-2">
                    <span
                      className="text-black"
                      style={{ fontSize: '20px' }}
                    >
                      {tool.icon}
                    </span>
                  </div>
                </div>
                <div className="card-body p-2">
                  <div
                    style={{
                      background: 'linear-gradient(90deg, #A1DE2F, #00A3FF)',
                      color: 'white',
                      textAlign: 'center',
                      padding: '8px',
                      fontWeight: 'bold',
                      fontSize: '14px',
                      borderRadius: '8px',
                      marginTop: '5px'
                    }}
                  >
                    {tool.title}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Placeholder Footer or Extra Space */}
        <div style={{ height: '100px' }}></div>
      </div>
    </div>
  );
};

export default ImageGenerationDashboard;