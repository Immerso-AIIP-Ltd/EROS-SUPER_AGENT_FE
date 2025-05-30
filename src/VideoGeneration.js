import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import kling from './kling.png';
import Luma from './Luma.jpg';
import wan from './wan.png'
import vidu from './vidu.png';
import runway from './runway.png';


// Import Poppins font (if using Google Fonts)
import './App.css'; // or import '@fontsource/poppins'; if you're using Fontsource

const VideoGeneration = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedModel, setSelectedModel] = useState('Runway');
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Welcome to Video Generations! I'm here to help you generate, edit, or enhance videos using AI tools. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [searchWeb, setSearchWeb] = useState(false);
  const messagesEndRef = useRef(null);


    const getSelectedIcon = () => {
    const selected = availableModels.find(model => model.name === selectedModel);
    return selected ? selected.icon : null;
  };

  // const availableModels = [
  //   { name: 'Mixture-of-Agents', description: 'Auto-mixes best AI models for your task.', icon: '🧩', selected: false },
  //   { name: 'Kling V2.0 Master', description: 'Advanced language model for complex reasoning', icon: '🤖', selected: selectedModel === 'GPT-4.1' },
  //   { name: 'MiniMax Video-01-LIve', description: 'OpenAI latest reasoning model', icon: '🤖', selected: false },
  //   { name: 'PixVerse V4 Turbo', description: 'Optimized for speed and efficiency', icon: '🤖', selected: false },
  //   { name: 'Wan V2.1', description: '', icon: '🎭', selected: false },
  //   { name: 'Vidu', description: '', icon: '🎭', selected: false },
  //   { name: 'Runway', description: '', icon: '🎭', selected: false },
  //   { name: 'Hunyuan', description: '', icon: '🎭', selected: false },
  //   { name: 'Kling V1.6', description: '', icon: '💎', selected: false },
  //   { name: 'Lumalabas DreamMachine', description: '', icon: '💎', selected: false },
  //   // { name: 'DeepSeek V3', description: '', icon: '🔍', selected: false },
  //   // { name: 'DeepSeek R1', description: '', icon: '🔍', selected: false }
  // ];


    const availableModels = [
     
      // { name: 'GPT-4.1', description: '', icon: '🤖', selected: selectedModel === 'GPT-4.1' },
                                     {
    name: 'Kling V2.0 Master',
    description: '',
    icon: <img src={kling} alt="Kling V2.0 Master" style={{ width: '20px', height: '20px' }} />,
    selected: selectedModel === 'Kling V2.0 Master' 
  },                          
      {
    name: 'Kling V1.6',
    description: '',
    icon: <img src={kling} alt="Kling V1.6" style={{ width: '20px', height: '20px' }} />,
   selected: selectedModel === 'Kling V2.0 Master' 
  },
                             {
    name: 'Lumalabas DreamMachine',
    description: '',
    icon: <img src={Luma} alt="Lumalabas DreamMachine" style={{ width: '20px', height: '20px' }} />,
    selected: selectedModel === 'Lumalabas DreamMachine' 
  },
                         {
    name: 'Vidu',
    description: '',
    icon: <img src={vidu} alt="Vidu" style={{ width: '20px', height: '20px' }} />,
     selected: selectedModel === 'Vidu' 
  },
                       {
    name: 'Wan V2.1',
    description: '',
    icon: <img src={wan} alt="Wan V2.1" style={{ width: '20px', height: '20px' }} />,
     selected: selectedModel === 'Wan V2.1' 
  },
                   {
    name: 'Runway',
    description: '',
    icon: <img src={runway} alt="Runway" style={{ width: '20px', height: '20px' }} />,
     selected: selectedModel === 'Runway' 
  }
  //               {
  //   name: 'Claude Sonnet 4',
  //   description: '',
  //   icon: <img src={claude} alt="DeepSeek Icon" style={{ width: '20px', height: '20px' }} />,
  //   selected: false
  // },
     
  //           {
  //   name: 'Gemini 2.5 Pro',
  //   description: '',
  //   icon: <img src={gemini} alt="DeepSeek Icon" style={{ width: '20px', height: '20px' }} />,
  //   selected: false
  // },
  //       {
  //   name: 'Gemini 2.5 Flash',
  //   description: '',
  //   icon: <img src={gemini} alt="DeepSeek Icon" style={{ width: '20px', height: '20px' }} />,
  //   selected: false
  // },
  //    {
  //   name: 'DeepSeek V3',
  //   description: '',
  //   icon: <img src={images1} alt="DeepSeek Icon" style={{ width: '20px', height: '20px' }} />,
  //   selected: false
  // },
  //      {
  //   name: 'DeepSeek R1',
  //   description: '',
  //   icon: <img src={images1} alt="DeepSeek Icon" style={{ width: '20px', height: '20px' }} />,
  //   selected: false
  // },
    ];

  const sidebarItems = [
       { name: 'Home', id: 'ai-chat', path: '/home', active: false },
    { name: 'AI Chat', id: 'ai-chat', path: '/', active: true },
    { name: 'Image Studio', id: 'image-studio', path: '/image-studio', active: false },
    { name: 'Video Generations', id: 'video', path: '/video', active: false },
    { name: 'All Agents', id: 'open-sources', path: '/agent', active: false },
    { name: 'Eternal Agent', id: 'eternal', path: '/eternal', active: false },
    { name: 'Health Agent', id: 'health', path: '/health', active: false },
  ];

  const [activeItem, setActiveItem] = useState('Video Generations');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: generateVideoResponse(message),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateVideoResponse = (userInput) => {
    const responses = [
      "There are several great tools for video generation. Would you like recommendations for platforms like Runway ML, Pika Labs, or Stable Video Diffusion?",
      "I can help you generate short clips or full-length videos. Could you describe what kind of content you're looking to create?",
      "For cinematic animation, try Pika or LTX Video. For editing and enhancements, Runway is ideal. What’s your use case?",
      "You can animate images into video using tools like Kaiber or Sora. Want me to suggest more options?",
      "Looking to generate videos from text prompts? Tools like Runway Gen-2 and Sora are perfect for that."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

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

      {/* Main Content */}
      <div
        className="flex-grow-1"
        style={{
          marginLeft: '250px',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          fontFamily: "'Poppins', sans-serif"
        }}
      >
        {/* Header */}
        <div
          className="p-4 border-bottom d-flex align-items-center justify-content-between"
          style={{
            backgroundColor: '#ffffff',
            borderBottomColor: '#e0e0e0 !important',
            color: '#000000'
          }}
        >
          <h2 className="text-black mb-0">Video Generations</h2>
          <div className="d-flex align-items-center">
            {/* <span className="badge bg-success me-2">Online</span> */}
            <small className="text-muted">Powered by {selectedModel}</small>
          </div>
        </div>

        {/* Chat Messages Area */}
        <div
          className="flex-grow-1 p-4"
          style={{
            backgroundColor: '#ffffff',
            overflowY: 'auto',
            paddingBottom: '120px',
            fontFamily: "'Poppins', sans-serif"
          }}
        >
          <div className="container-fluid">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`mb-4 d-flex ${msg.sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`}
              >
                <div
                  className={`d-flex align-items-start ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                  style={{ maxWidth: '70%' }}
                >
                  {/* Avatar */}
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center me-3 ms-3"
                    style={{
                      width: '40px',
                      height: '40px',
                      backgroundImage: 'linear-gradient(90deg, #A1DE2F, #00A3FF)',
                      background: 'linear-gradient(90deg, #A1DE2F, #00A3FF)',
                      color: 'white',
                      fontSize: '18px',
                      flexShrink: 0
                    }}
                  >
                    {msg.sender === 'user' ? '👤' : '🎥'}
                  </div>

                  {/* Message Bubble */}
                  <div className="d-flex flex-column">
                    <div
                      className={`p-3 rounded-3 ${
                        msg.sender === 'user' ? 'text-black' : 'text-black'
                      }`}
                      style={{
                        backgroundColor: msg.sender === 'user' ? '#f1f1f1' : '#f9f9f9',
                        border: 'none',
                        borderRadius: msg.sender === 'user' ? '20px 20px 5px 20px' : '20px 20px 20px 5px'
                      }}
                    >
                      {msg.text}
                    </div>
                    <small
                      className={`mt-1 ${msg.sender === 'user' ? 'text-end' : 'text-start'}`}
                      style={{ color: '#666' }}
                    >
                      {formatTime(msg.timestamp)}
                    </small>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="mb-4 d-flex justify-content-start">
                <div className="d-flex align-items-start" style={{ maxWidth: '70%' }}>
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center me-3"
                    style={{
                      width: '40px',
                      height: '40px',
                      backgroundImage: 'linear-gradient(90deg, #A1DE2F, #00A3FF)',
                      background: 'linear-gradient(90deg, #A1DE2F, #00A3FF)',
                      color: 'white',
                      fontSize: '18px'
                    }}
                  >
                    🎥
                  </div>
                  <div
                    className="p-3 rounded-3"
                    style={{
                      backgroundColor: '#f9f9f9',
                      border: '1px solid #e0e0e0',
                      borderRadius: '20px 20px 20px 5px',
                      color: '#000000'
                    }}
                  >
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Chat Input Section */}
        <div
          className="position-fixed bottom-0 end-0"
          style={{
            backgroundColor: '#ffffff',
            left: '250px',
            right: '0',
            borderTop: '1px solid #e0e0e0',
            zIndex: 1000,
            fontFamily: "'Poppins', sans-serif"
          }}
        >
          <div className="p-3">
            <div className="d-flex align-items-center mb-3">
              <button
                className="btn btn-link text-black p-1 me-2"
                style={{ textDecoration: 'none' }}
                title="Attach file"
              >
                📎
              </button>

              {/* Model Selector */}
              <div className="position-relative me-2">
 <button
      className="badge px-3 py-2 border-0 d-flex align-items-center"
      style={{
        backgroundColor: '#e6e6e6',
        color: '#000000',
        borderRadius: '20px',
        fontSize: '12px',
        cursor: 'pointer',
        gap: '8px'
      }}
      onClick={() => setShowModelDropdown(true)}
    >
      {getSelectedIcon() && <span>{getSelectedIcon()}</span>}
      <span>{selectedModel}</span>
    </button>

                {/* Dropdown Menu */}
                {showModelDropdown && (
                  <div
                    className="position-absolute bottom-100 mb-2 bg-white border rounded shadow-lg"
                    style={{
                      width: '400px',
                      maxHeight: '400px',
                      overflowY: 'auto',
                      zIndex: 1001,
                      border: '1px solid #ddd',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      padding: '8px',
                      fontFamily: "'Poppins', sans-serif"
                    }}
                  >
                    {availableModels.map((model, index) => (
                      <div
                        key={index}
                        className="d-flex align-items-center p-3 border-bottom"
                        style={{
                          borderBottomColor: '#eee',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s',
                          fontFamily: "'Poppins', sans-serif"
                        }}
                        onClick={() => {
                          setSelectedModel(model.name);
                          setShowModelDropdown(false);
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor = '#fafafa')
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor = 'white')
                        }
                      >
                        <span className="me-3" style={{ fontSize: '20px' }}>
                          {model.icon}
                        </span>
                        <div className="flex-grow-1">
                          <div className="fw-medium">{model.name}</div>
                          {model.description && <div className="text-muted small">{model.description}</div>}
                        </div>
                        <div className="ms-2">
                          <div
                            className="rounded-circle"
                            style={{
                              width: '12px',
                              height: '12px',
                              backgroundColor: model.selected ? '#007bff' : '#bbb'
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Search Web Toggle */}
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="searchWeb"
                  checked={searchWeb}
                  onChange={(e) => setSearchWeb(e.target.checked)}
                  style={{
                    backgroundColor: 'transparent',
                    borderColor: '#aaa'
                  }}
                />
                <label
                  className="form-check-label ms-2"
                  htmlFor="searchWeb"
                  style={{ color: '#000000' }}
                >
                  Search Web
                </label>
              </div>
            </div>

            {/* Input Box */}
            <div className="position-relative">
              <textarea
                className="form-control pe-5"
                placeholder="Ask about AI video tools, animation, or how to convert images to video..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                rows="1"
                style={{
                  backgroundColor: '#f9f9f9',
                  border: '1px solid #ccc',
                  color: '#000000',
                  borderRadius: '25px',
                  padding: '12px 60px 12px 20px',
                  resize: 'none',
                  minHeight: '50px',
                  fontFamily: "'Poppins', sans-serif"
                }}
              />
              <style jsx>{`
                .form-control::placeholder {
                  color: #888 !important;
                  opacity: 1;
                  font-family: 'Poppins', sans-serif;
                }
              `}</style>
              <div className="position-absolute end-0 top-50 translate-middle-y me-2 d-flex align-items-center">
                <button
                  className="btn btn-success rounded-circle me-2 d-flex align-items-center justify-content-center"
                  style={{
                    width: '36px',
                    height: '36px',
                    padding: '0',
                    background: 'linear-gradient(90deg, #A1DE2F, #00A3FF)',
                    border: 'none',
                    color: 'white'
                  }}
                  onClick={handleSendMessage}
                  disabled={!message.trim() || isTyping}
                >
                  ➤
                </button>
                {/* <button
                  className="btn btn-outline-secondary rounded-circle"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderColor: '#404040',
                    color: '#000000'
                  }}
                  title="Voice message"
                >
                  🎤
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoGeneration;