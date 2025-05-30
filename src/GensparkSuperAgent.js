
import React, { useState,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const GensparkSuperAgent = ({ action }) => {
  const navigate = useNavigate();
   const [activeItem, setActiveItem] = useState('video-generations');

const handleClick = (label) => {
  if (label === 'All Agents') {
    navigate('/agent');
  } else if (label === 'AI Chat') {
    navigate('/');
  }
};
   
  

  // Sidebar items
  const sidebarItems = [
     { name: 'Home', id: 'ai-chat', path: '/home', active: true },
    { name: 'AI Chat', id: 'ai-chat', path: '/', active: false },
    { name: 'Image Studio', id: 'image-studio', path: '/image-studio', active: false },
    { name: 'Video Generations', id: 'video', path: '/video', active: false },
    { name: 'All Agents', id: 'open-sources', path: '/agent', active: false },
    { name: 'Eternal Agent', id: 'eternal', path: '/eternal', active: false },
    { name: 'Health Agent', id: 'health', path: '/health', active: false },
  ];

  // Quick actions
  const quickActions = [
    { icon: '', label: 'Image Generations', new: true },
    { icon: '', label: 'Video Generations', new: true },
    { icon: '', label: 'Text to Anime', new: true },
    { icon: '', label: 'Video to Anime', new: true },
      { icon: '', label: 'Eternal Agent', new: true },
       { icon: '', label: 'Health Agent', new: true },
    { icon: '', label: 'All Agents', new: false },
  ];

  // Chat state
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Welcome to Eros Super Agent! Ask anything, create anything.",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const messagesEndRef = useRef(null);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    const userMessage = {
      id: Date.now(),
      text: message,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100" style={{ backgroundColor: 'white', color: 'black' }}>
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="mb-0">Eros Super Agent</h1>
      </div>

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
          <div className="d-flex align-items-center mb-4">
            <h5
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
            </h5>
          </div>

          <nav className="nav nav-pills flex-column">
            {sidebarItems.map((item, index) => {
              const isActive = activeItem === item.name;

              return (
                <div
                  key={index}
                  className={`p-2 mb-1 rounded cursor-pointer ${
                    isActive ? 'text-black' : 'text-black opacity-75'
                  }`}
                  style={{
                    backgroundColor: isActive ? '#f1f1f1' : 'transparent',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontFamily: "'Poppins', sans-serif"
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = '#eaeaea';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                  onClick={() => {
                    setActiveItem(item.name);
                    if (item.path) {
                      navigate(item.path);
                    }
                  }}
                >
                  {item.name}
                </div>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Quick Actions */}
 <div className="d-flex justify-content-center mb-4">
      {quickActions.map((action, index) => (
        <button
          key={index}
          className={`btn btn-outline-secondary px-3 py-2 mx-2 text-white`}
          style={{
            background: 'linear-gradient(90deg, #A1DE2F, #00A3FF)',
            borderRadius: '20px',
            fontSize: '14px',
            cursor: 'pointer',
            border: 'none',
            fontWeight: '500'
          }}
         onClick={() => handleClick(action?.label)}
        >
          {action.new && (
            <span
              className="badge bg-white me-2"
              style={{
                fontSize: '0.7rem',
                color: '#000',
                fontWeight: 'bold'
              }}
            >
              New
            </span>
          )}
          <span className="me-2">{action.icon}</span>
           {action.label || 'Untitled'}
        </button>
      ))}
    </div>

      {/* Chat Input Box */}
<div className="w-75 p-3 rounded shadow-lg bg-white text-black d-flex align-items-center justify-content-between position-relative"   style={{ marginLeft: '250px' }}>
  {/* Chat Input Wrapper */}
  <div className="d-flex align-items-center w-100" style={{ position: 'relative' }}>
    {/* Chat Input */}
    <textarea
      type="text"
      className="form-control pe-5 ps-4 py-3 w-100"
      placeholder="Ask anything, create anything..."
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onKeyPress={(e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleSendMessage();
        }
      }}
      style={{
        backgroundColor: 'white',
        border: 'none',
        color: 'black',
        borderRadius: '25px',
        padding: '12px 60px 12px 20px', // Left/right padding for icon/space
        resize: 'none',
        minHeight: '50px',
        fontSize: '14px',
        fontFamily: "'Poppins', sans-serif"
      }}
    />

    {/* Action Button (Send Message) */}
    <button
      className="btn btn-success rounded-circle d-flex align-items-center justify-content-center"
      style={{
        width: '36px',
        height: '36px',
        background: 'linear-gradient(90deg, #A1DE2F, #00A3FF)',
        color: 'white',
        border: 'none',
        position: 'absolute',
        right: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 10
      }}
      onClick={handleSendMessage}
      // disabled={!message.trim() || isTyping}
    >
      ➤
    </button>
  </div>
</div>
    </div>

    //   <style jsx>{`
    //       .form-control::placeholder {
    //         color: #888 !important;
    //         opacity: 1;
    //         font-family: 'Poppins', sans-serif;
    //       }
    //     `}</style>
  );
};

export default GensparkSuperAgent;