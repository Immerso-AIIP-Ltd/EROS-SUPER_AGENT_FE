import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import images1 from './images1.png'
import gemini from './gemini.png'
import claude from './claude.jpg'
import gpt from './gpt.png'

const EternalAIAgent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedModel, setSelectedModel] = useState('GPT-4.1');
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Welcome to Eternal AI! I'm here to help you explore time, history, and beyond. How can I assist you today?",
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



  const availableModels = [
    
     // { name: 'GPT-4.1', description: '', icon: '🤖', selected: selectedModel === 'GPT-4.1' },
                                    {
   name: 'GPT-4.1',
   description: '',
   icon: <img src={gpt} alt="GPT-4.1" style={{ width: '20px', height: '20px' }} />,
   selected: selectedModel === 'GPT-4.1' 
 },                          
     {
   name: 'o3',
   description: '',
   icon: <img src={gpt} alt="o3" style={{ width: '20px', height: '20px' }} />,
   selected: selectedModel === 'o3'
 },
                            {
   name: 'o4-mini-high',
   description: '',
   icon: <img src={gpt} alt="o4-mini-high" style={{ width: '20px', height: '20px' }} />,
   selected: selectedModel === 'o4-mini-high'
 },
                        {
   name: 'Claude 3.7 Sonnet(Thinking)',
   description: '',
   icon: <img src={claude} alt="Claude 3.7 Sonnet(Thinking)" style={{ width: '20px', height: '20px' }} />,
   selected: selectedModel === 'Claude 3.7 Sonnet(Thinking)'
 },
                      {
   name: 'Claude 3.7 Sonnet',
   description: '',
   icon: <img src={claude} alt="Claude 3.7 Sonnet" style={{ width: '20px', height: '20px' }} />,
    selected: selectedModel === 'Claude 3.7 Sonnet'
 },
                  {
   name: 'Claude Sonnet 4 (Thinking)',
   description: '',
   icon: <img src={claude} alt="Claude Sonnet 4 (Thinking)" style={{ width: '20px', height: '20px' }} />,
   selected: selectedModel === 'Claude Sonnet 4 (Thinking)'
 },
               {
   name: 'Claude Sonnet 4',
   description: '',
   icon: <img src={claude} alt="Claude Sonnet 4" style={{ width: '20px', height: '20px' }} />,
   selected: selectedModel === 'Claude Sonnet 4'
 },
    
           {
   name: 'Gemini 2.5 Pro',
   description: '',
   icon: <img src={gemini} alt="Gemini 2.5 Pro" style={{ width: '20px', height: '20px' }} />,
     selected: selectedModel === 'Gemini 2.5 Pro'
 },
       {
   name: 'Gemini 2.5 Flash',
   description: '',
   icon: <img src={gemini} alt="Gemini 2.5 Flash" style={{ width: '20px', height: '20px' }} />,
   selected: selectedModel === 'Gemini 2.5 Flash'
 },
    {
   name: 'DeepSeek V3',
   description: '',
   icon: <img src={images1} alt="DeepSeek V3" style={{ width: '20px', height: '20px' }} />,
   selected: selectedModel === 'DeepSeek V3'
 },
      {
   name: 'DeepSeek R1',
   description: '',
   icon: <img src={images1} alt="DeepSeek R1" style={{ width: '20px', height: '20px' }} />,
   selected: false
 },
   ];

  const sidebarItems = [
     { name: 'Home', id: 'home', path: '/home', active: false },
    { name: 'AI Chat', id: 'ai-chat', path: '/', active: true },
    { name: 'Image Studio', id: 'image-studio', path: '/image-studio', active: false },
    { name: 'Video Generations', id: 'video', path: '/video', active: false },
    { name: 'All Agents', id: 'open-sources', path: '/agent', active: false },
    { name: 'Eternal Agent', id: 'eternal', path: '/eternal', active: false },
    { name: 'Health Agent', id: 'health', path: '/health', active: false },
  ];

  const [activeItem, setActiveItem] = useState('Eternal Agent');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
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

    // Simulate AI response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: generateEternalResponse(message),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateEternalResponse = (userInput) => {
    const responses = [
      "As an Eternal AI, I can help you choose the right AI tools for your project.",
      "There are many powerful AI tools available today — from content creation to automation. What area are you interested in?",
      "Let me suggest some AI tools that can boost your productivity or solve specific problems in your workflow.",
      "Would you like recommendations for AI chatbots, image generators, or video creation tools?",
      "Whether it's writing, design, coding, or data analysis — I’ve got tools to help you work smarter."
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
        <div className="p-4 border-bottom d-flex align-items-center justify-content-between" style={{ 
          backgroundColor: '#ffffff', 
          borderBottomColor: '#e0e0e0 !important',
          fontFamily: "'Poppins', sans-serif"
        }}>
          <h2 className="text-black mb-0"> Eternal AI Agent</h2>
          <div className="d-flex align-items-center">
            {/* <span className="badge bg-success me-2">Online</span> */}
            <small className="text-muted">Powered by {selectedModel}</small>
          </div>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-grow-1 p-4" style={{ 
          backgroundColor: '#ffffff', 
          overflowY: 'auto',
          paddingBottom: '120px',
          fontFamily: "'Poppins', sans-serif"
        }}>
          <div className="container-fluid">
            {messages.map((msg) => (
              <div key={msg.id} className={`mb-4 d-flex ${msg.sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
                <div className={`d-flex align-items-start ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`} style={{ maxWidth: '70%' }}>
                  {/* Avatar */}
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center me-3 ms-3"
                    style={{
                      width: '40px',
                      height: '40px',
                      backgroundImage: msg.sender === 'user'
                        ? 'linear-gradient(90deg, #007bff, #0056b3)'
                        : 'linear-gradient(90deg, #A1DE2F, #00A3FF)',
                      background: msg.sender === 'user'
                        ? 'linear-gradient(90deg, #007bff, #0056b3)'
                        : 'linear-gradient(90deg, #A1DE2F, #00A3FF)',
                      color: 'white',
                      fontSize: '18px',
                      flexShrink: 0
                    }}
                  >
                    {msg.sender === 'user' ? '👤' : '⏳'}
                  </div>

                  {/* Message Bubble */}
                  <div className="d-flex flex-column">
                    <div
                      className={`p-3 rounded-3 ${msg.sender === 'user' ? 'text-black' : 'text-black'}`}
                      style={{
                        background: msg.sender === 'user' ? '#e6e6e6' : '#f5f5f5',
                        border: msg.sender === 'bot' ? '1px solid #ddd' : 'none',
                        borderRadius: msg.sender === 'user' ? '20px 20px 5px 20px' : '20px 20px 20px 5px',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                        fontFamily: "'Poppins', sans-serif"
                      }}
                    >
                      <p className="mb-0" style={{ lineHeight: '1.5' }}>{msg.text}</p>
                    </div>
                    <small className={`text-muted mt-1 ${msg.sender === 'user' ? 'text-end' : 'text-start'}`}>
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
                      background: 'linear-gradient(90deg, #A1DE2F, #00A3FF)',
                      color: 'white',
                      fontSize: '18px'
                    }}
                  >
                    ⏳
                  </div>
                  <div
                    className="p-3 rounded-3"
                    style={{
                      backgroundColor: '#f5f5f5',
                      border: '1px solid #ddd',
                      borderRadius: '20px 20px 20px 5px'
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
        <div className="position-fixed bottom-0 end-0" style={{ 
          backgroundColor: '#ffffff', 
          left: '250px',
          right: '0',
          borderTop: '1px solid #e0e0e0',
          zIndex: 1000,
          fontFamily: "'Poppins', sans-serif"
        }}>
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
                      padding: '8px'
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
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fafafa'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                      >
                        <span className="me-3" style={{ fontSize: '20px' }}>
                          {model.icon}
                        </span>
                        <div className="flex-grow-1">
                          <div className="fw-medium mb-1">{model.name}</div>
                          {model.description && (
                            <div className="text-muted small">
                              {model.description}
                            </div>
                          )}
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
                  style={{ fontSize: '14px' }}
                >
                  Search Web
                </label>
              </div>
            </div>

            {/* Input Field */}
            <div className="position-relative">
              <textarea
                className="form-control pe-5"
                placeholder="Ask about timelines, historical events, or future projections..."
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
                    borderColor: '#ccc',
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

      {/* Custom CSS for typing indicator and scroll */}
      <style jsx>{`
        .typing-indicator {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .typing-indicator span {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #888;
          animation: typing 1.4s infinite ease-in-out;
        }
        .typing-indicator span:nth-child(1) { animation-delay: 0s; }
        .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
        .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes typing {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.5;
          }
          30% {
            transform: translateY(-10px);
            opacity: 1;
          }
        }

        /* Scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        ::-webkit-scrollbar-thumb {
          background: #ddd;
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #ccc;
        }
      `}</style>
    </div>
  );
};

export default EternalAIAgent;