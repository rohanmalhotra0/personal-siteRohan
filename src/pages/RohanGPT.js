import React, { useState, useEffect, useRef } from 'react';

const RohanGPT = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  const { PUBLIC_URL } = process.env;

  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollTop = chatEndRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input on mobile
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const getGeneralResponse = () => {
    const responses = [
      'That\'s an interesting question! I\'d love to help you with that.',
      'Great question! Let me think about that for a moment.',
      'I\'m here to help! Can you tell me more about what you\'re looking for?',
      'That sounds fascinating! I\'d be happy to discuss that with you.',
      'Thanks for asking! I\'m always excited to chat about new topics.',
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const getPersonalizedOverride = (message, userName) => {
    const lowerMessage = message.toLowerCase();
    const lowerName = userName.toLowerCase();

    // Check for specific name + keyword combinations
    if (lowerName.includes('colin') && lowerMessage.includes('drink')) {
      return 'Take a big sip Colin! 🍺';
    }
    if (lowerName.includes('abbie') && lowerMessage.includes('drink')) {
      return 'Take a big sip Abbie! 🍺';
    }

    return null;
  };

  const askRohan = async () => {
    if (!input.trim() || !name.trim()) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      name,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    // Check for personalized overrides first
    const override = getPersonalizedOverride(input, name);
    if (override) {
      setTimeout(() => {
        const botMessage = {
          id: Date.now() + 1,
          role: 'bot',
          content: override,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, botMessage]);
        setLoading(false);
      }, 1000);
      return;
    }

    try {
      const functionsBase = process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_FUNCTIONS_BASE
        : 'http://localhost:8888';

      const response = await fetch(`${functionsBase}/.netlify/functions/ask-rohan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          name,
          conversationHistory: messages.slice(-10), // Last 10 messages for context
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      const botMessage = {
        id: Date.now() + 1,
        role: 'bot',
        content: data.response || getGeneralResponse(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      const botMessage = {
        id: Date.now() + 1,
        role: 'bot',
        content: getGeneralResponse(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      askRohan();
    }
  };

  return (
    <div id="rohangpt">
      <div className="mobile-chat-container">
        {/* Header */}
        <div className="chat-header">
          <div className="header-content">
            <div className="bot-avatar">
              <img src={`${PUBLIC_URL}/profile.jpg`} alt="Rohan" className="avatar-img" />
            </div>
            <div className="bot-info">
              <h3>RohanGPT</h3>
              <p>AI Assistant</p>
            </div>
          </div>
          <div className="status-indicator">
            <div className={`status-dot ${loading ? 'typing' : 'online'}`} />
            <span>{loading ? 'Typing...' : 'Online'}</span>
          </div>
        </div>

        {/* Messages */}
        <div className="messages-container" ref={chatEndRef}>
          {messages.length === 0 && (
            <div className="welcome-message">
              <div className="welcome-icon">👋</div>
              <h4>Welcome to RohanGPT!</h4>
              <p>Ask me anything! Just include your name and question.</p>
            </div>
          )}

          {messages.map((msg) => (
            <div key={msg.id} className={`message ${msg.role === 'user' ? 'user' : 'bot'}`}>
              <div className="message-avatar">
                {msg.role === 'user' ? (
                  <div className="user-avatar">
                    <span className="user-name">{msg.name ? msg.name.charAt(0).toUpperCase() : 'U'}</span>
                  </div>
                ) : (
                  <img src={`${PUBLIC_URL}/profile.jpg`} alt="Rohan" className="avatar-img" />
                )}
              </div>
              <div className="message-content">
                <div className="message-bubble">
                  <p>{msg.content}</p>
                  <span className="message-time">{msg.timestamp}</span>
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="message bot">
              <div className="message-avatar">
                <img src={`${PUBLIC_URL}/profile.jpg`} alt="Rohan" className="avatar-img" />
              </div>
              <div className="message-content">
                <div className="typing-indicator">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="input-container">
          <div className="input-row">
            <div className="name-input-wrapper">
              <div className="input-with-icon">
                <i className="fas fa-user input-icon" />
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="name-input"
                  maxLength={20}
                />
              </div>
            </div>
            <div className="message-input-wrapper">
              <div className="input-with-icon">
                <i className="fas fa-comment input-icon" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Ask RohanGPT anything..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="message-input"
                  maxLength={500}
                />
              </div>
              <button
                type="button"
                onClick={askRohan}
                disabled={!input.trim() || !name.trim() || loading}
                className="send-button"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RohanGPT;
