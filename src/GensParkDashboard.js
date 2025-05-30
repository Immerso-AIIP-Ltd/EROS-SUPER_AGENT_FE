import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import images1 from './images1.png';

// Import icons from react-icons
import { FaRegImages, FaVideo, FaMagic, FaFilm } from 'react-icons/fa';

const GensParkDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Sidebar state
  const [activeSection, setActiveSection] = useState('video-generations');

  // Chat state
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Welcome to Video Generations! I'm here to help you generate videos using AI tools. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Model selection (optional feature)
  const [selectedModel, setSelectedModel] = useState('GPT-4.1');
  const [showModelDropdown, setShowModelDropdown] = useState(false);

  const availableModels = [
    { name: 'Mixture-of-Agents', description: '', icon: '🧩', selected: false },
    { name: 'GPT-4.1', description: '', icon: '🤖', selected: selectedModel === 'GPT-4.1' },
    { name: 'o3', description: '', icon: '🤖', selected: false },
    { name: 'o4-mini-high', description: '', icon: '🤖', selected: false },
    { name: 'Claude 3.7 Sonnet (Thinking)', description: '', icon: '🎭', selected: false },
    { name: 'Claude 3.5 Sonnet', description: '', icon: '🎭', selected: false },
    { name: 'Claude Sonnet 4 (Thinking)', description: '', icon: '🎭', selected: false },
    { name: 'Claude Sonnet 4', description: '', icon: '🎭', selected: false },
    { name: 'Gemini 2.5 Flash', description: '', icon: '💎', selected: false },
    { name: 'Gemini 2.5 Pro', description: '', icon: '💎', selected: false },
    { name: 'DeepSeek V3', description: '', icon: '🔍', selected: false },
    { name: 'DeepSeek R1', description: '', icon: '🔍', selected: false }
  ];

  const sidebarItems = [
    { id: 'home', label: 'Home', path: '/home' },
    { id: 'ai-chat', label: 'AI Chat', path: '/' },
    { id: 'image-studio', label: 'Image Studio', path: '/image-studio' },
    { id: 'video-generations', label: 'Video Generations', path: '/video' },
    { id: 'all-agents', label: 'All Agents', path: '/agent' },
    { id: 'eternal', label: 'Eternal Agent', path: '/eternal' },
    { id: 'health', label: 'Health Agent', path: '/health' },
  ];

const advancedAgents = [
  {
    title: "Image Generations",
    badge: "NEW",
    description: "Popular tasks:",
    tasks: ["Create promotional images for a travel blog", "Design restaurant interiors", "Visualize futuristic tech gadgets"]
  },
  {
    title: "Video Generations",
    badge: "NEW",
    description: "Popular tasks:",
    tasks: ["Create a short explainer video", "Convert image into cinematic video"]
  },
  {
    title: "Text to Anime",
    badge: "NEW",
    description: "Popular tasks:",
    tasks: ["Animate your article into a video", "Turn script into animated scene"]
  },
  {
    title: "Video to Anime",
    badge: "NEW",
    description: "Popular tasks:",
    tasks: ["Extract and animate highlights from LinkedIn videos", "Download and animate TikTok content"]
  },
  {
    title: "Eternal Agent",
    badge: "NEW",
    description: "Popular tasks:",
    tasks: ["Simulate alternate timelines", "Predict future trends based on historical data"]
  },
  {
    title: "Health Agent",
    badge: "NEW",
    description: "Popular tasks:",
    tasks: ["Get personalized diet plans", "Create fitness routines using AI"]
  }
];

const basicAgents = [
  {
    name: "Image Generations",
    icon: (
      <div style={{
        width: '36px',
        height: '36px',
        background: 'linear-gradient(90deg, #A1DE2F, #00A3FF)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <FaRegImages color="white" />
      </div>
    ),
    models: ["DALL-E", "Midjourney", "Stable Diffusion"]
  },
  {
    name: "Video Generations",
    icon: (
      <div style={{
        width: '36px',
        height: '36px',
        background: 'linear-gradient(90deg, #A1DE2F, #00A3FF)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <FaVideo color="white" />
      </div>
    ),
    models: ["Runway", "Pika", "Stable Video"]
  },
  {
    name: "Text to Anime",
    icon: (
      <div style={{
        width: '36px',
        height: '36px',
        background: 'linear-gradient(90deg, #A1DE2F, #00A3FF)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <FaMagic color="white" />
      </div>
    ),
    models: ["Gen-2", "Kaiber", "EbSynth"]
  },
  {
    name: "Video to Anime",
    icon: (
      <div style={{
        width: '36px',
        height: '36px',
        background: 'linear-gradient(90deg, #A1DE2F, #00A3FF)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <FaFilm color="white" />
      </div>
    ),
    models: ["Runway Gen-2", "PixVerse", "Sora"]
  },
  {
    name: "Eternal Agent",
    icon: (
      <div style={{
        width: '36px',
        height: '36px',
        background: 'linear-gradient(90deg, #A1DE2F, #00A3FF)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <span style={{ fontSize: '18px', color: 'white' }}>⏳</span>
      </div>
    ),
    models: ["Mixture-of-Agents", "Time Machine AI", "Historical Simulator"]
  },
  {
    name: "Health Agent",
    icon: (
      <div style={{
        width: '36px',
        height: '36px',
        background: 'linear-gradient(90deg, #A1DE2F, #00A3FF)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <span style={{ fontSize: '18px', color: 'white' }}>🌿</span>
      </div>
    ),
    models: ["Personalized Diet AI", "Fitness Planner", "Wellness Coach"]
  }
];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const matchedItem = sidebarItems.find(item => item.path === location.pathname);
    if (matchedItem) {
      setActiveSection(matchedItem.id);
    }
    scrollToBottom();
  }, [location.pathname]);

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

  const generateVideoResponse = (input) => {
    const responses = [
      "There are several great tools for video generation. Would you like recommendations for Runway ML, Pika Labs, or Stable Video Diffusion?",
      "I can help you generate short clips or full-length videos. Could you describe what kind of content you're looking to create?",
      "For cinematic animation, try Pika or LTX Video. For editing and enhancements, Runway is ideal. What’s your use case?"
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
          backdropFilter: 'blur(20px)'
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
                fontSize: '1.3rem'
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
                  style={{
                    backgroundColor: isActive ? '#f1f1f1' : 'transparent',
                    border: 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onClick={() => {
                    setActiveSection(item.id);
                    navigate(item.path);
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div
        className="flex-grow-1 p-4"
        style={{
          marginLeft: '250px',
          backgroundColor: '#ffffff',
          fontFamily: "'Poppins', sans-serif"
        }}
      >

        {/* Section Title */}
        <section className="mb-5">
          <h2 className="text-black mb-3">Advanced Agents</h2>
          <p className="text-muted mb-4">Work autonomously on your complex tasks.</p>

          <div className="row g-4">
            {advancedAgents.map((agent, index) => (
              <div key={index} className="col-4 col-lg-4">
                <div className="card h-100" style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #ddd'
                }}>
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                      <h5 className="card-title text-black mb-0 me-2">{agent.title}</h5>
                      {agent.badge && (
                        <span 
  className="badge" 
  style={{
    background: 'linear-gradient(90deg, #A1DE2F, #00A3FF)',
    color: 'white',
    fontSize: '0.75rem',
    padding: '0.4em 0.6em'
  }}
>
  {agent.badge}
</span>
                      )}
                      <button className="btn btn-outline-light btn-sm ms-auto">+ Task</button>
                    </div>

                    {agent.description && (
                      <p className="text-muted small mb-3">{agent.description}</p>
                    )}

                    <div className="mb-3">
                      {agent.tasks?.map((task, taskIndex) => (
                        <div key={taskIndex} className="mt-2">
                          <small className="text-black d-block">{task}</small>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-black mb-3">Basic Agents</h2>
          <p className="text-muted mb-4">World's First Mixture-of-Agents system</p>

<div className="row g-4">
  {basicAgents.map((agent, index) => (
    <div key={index} className="col-12 col-sm-6 col-lg-3">
      <div className="card text-center h-100" style={{ backgroundColor: 'white', border: '1px solid #555' }}>
        <div className="card-body d-flex flex-column">
          <div className="mb-3 mx-auto">
            {agent.icon}
          </div>
          <h5 className="card-title text-black mb-3">{agent.name}</h5>
          <div className="mt-auto">
            <small className="text-black d-block mb-2">Mixture-of-Agents</small>
            <div className="d-flex justify-content-center">
              {agent.models.map((model, modelIndex) => (
                <span 
                  key={modelIndex}
                  className="badge bg-secondary me-1"
                  style={{ fontSize: '0.7rem' }}
                >
                  {model}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>
        </section>

       
        {/* <div className="position-fixed bottom-0 end-0" style={{
          backgroundColor: '#ffffff',
          left: '250px',
          right: '0',
          borderTop: '1px solid #e0e0e0',
          zIndex: 1000
        }}>
          <div className="container-fluid">
            <div className="p-3">
              <div className="d-flex align-items-center mb-3">
                <button
                  className="btn btn-link text-black p-1 me-2"
                  style={{ textDecoration: 'none' }}
                  title="Attach file"
                >
                  📎
                </button>

                
                <div className="position-relative me-2">
                  <button
                    className="btn px-3 py-2"
                    style={{
                      backgroundColor: '#eaeaea',
                      color: '#000000',
                      borderRadius: '20px',
                      fontSize: '14px',
                      cursor: 'pointer'
                    }}
                    onClick={() => setShowModelDropdown(!showModelDropdown)}
                  >
                    🤖 {selectedModel}
                  </button>

               
                  {showModelDropdown && (
                    <div
                      className="position-absolute bottom-100 mb-2 bg-white border rounded shadow-lg"
                      style={{
                        width: '350px',
                        maxHeight: '400px',
                        overflowY: 'auto',
                        zIndex: 1001,
                        border: '1px solid #ddd',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        padding: '8px'
                      }}
                    >
                      {availableModels.map((model, idx) => (
                        <div
                          key={idx}
                          className="d-flex align-items-center p-3 border-bottom"
                          style={{
                            borderBottomColor: '#eee',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s'
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

              
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="searchWeb"
                    style={{
                      backgroundColor: 'transparent',
                      borderColor: '#aaa'
                    }}
                  />
                  <label
                    className="form-check-label text-black ms-2"
                    htmlFor="searchWeb"
                    style={{ fontSize: '14px' }}
                  >
                    Search Web
                  </label>
                </div>
              </div>

           
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control pe-5"
                  placeholder="What Video do you want to create?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  style={{
                    backgroundColor: '#f9f9f9',
                    border: '1px solid #ccc',
                    color: '#000000',
                    borderRadius: '25px',
                    padding: '12px 50px 12px 20px'
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
                      background: 'linear-gradient(90deg, #A1DE2F, #00A3FF)',
                      color: 'white',
                      border: 'none'
                    }}
                    onClick={handleSendMessage}
                  >
                    ➤
                  </button>
                  <button
                    className="btn btn-link text-black p-1"
                    style={{ textDecoration: 'none' }}
                  >
                    🎤
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>

    
      {/* <div
        className="flex-grow-1 p-4"
        style={{
          marginLeft: '250px',
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
              <div className="d-flex align-items-start" style={{ maxWidth: '70%' }}>
             
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center me-3"
                  style={{
                    width: '40px',
                    height: '40px',
                    background: msg.sender === 'user'
                      ? 'linear-gradient(90deg, #007bff, #0056b3)'
                      : 'linear-gradient(90deg, #A1DE2F, #00A3FF)',
                    color: 'white',
                    fontSize: '18px',
                    flexShrink: 0
                  }}
                >
                  {msg.sender === 'user' ? '👤' : '🎥'}
                </div>

              
                <div className="d-flex flex-column">
                  <div
                    className={`p-3 rounded-3 ${msg.sender === 'user' ? 'text-black' : 'text-black'}`}
                    style={{
                      background: msg.sender === 'user'
                        ? '#e6e6e6'
                        : '#f5f5f5',
                      borderRadius: '20px',
                      border: 'none'
                    }}
                  >
                    <p className="mb-0" style={{ lineHeight: '1.5' }}>
                      {msg.text}
                    </p>
                  </div>
                  <small className={`text-muted mt-1 ${msg.sender === 'user' ? 'text-end' : 'text-start'}`}>
                    {formatTime(msg.timestamp)}
                  </small>
                </div>
              </div>
            </div>
          ))}

      

          <div ref={messagesEndRef} />
        </div>
      </div> */}
    </div>
  );
};

export default GensParkDashboard;