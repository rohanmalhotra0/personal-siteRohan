import React, {
  useState,
  useEffect,
  useRef,
  useContext,
} from 'react';
import PropTypes from 'prop-types';
import { ConversationContext } from '../components/Template/ConversationContext';

const RohanGPT = ({ rootId, messagePlaceholder }) => {
  const conversation = useContext(ConversationContext);
  const [messagesLocal, setMessagesLocal] = useState([]);
  const [input, setInput] = useState('');
  const [nameLocal, setNameLocal] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  const { PUBLIC_URL } = process.env;

  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollTop = chatEndRef.current.scrollHeight;
    }
  };

  const autoResize = () => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`;
    }
  };

  const activeMessages = conversation ? conversation.messages : messagesLocal;
  const setActiveMessages = conversation ? conversation.setMessages : setMessagesLocal;
  const activeName = conversation ? conversation.name : nameLocal;
  const setActiveName = conversation ? conversation.setName : setNameLocal;

  useEffect(() => {
    scrollToBottom();
  }, [activeMessages]);

  useEffect(() => {
    autoResize();
  }, [input]);

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
    if (!input.trim() || !activeName.trim()) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      name: activeName,
    };

    setActiveMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    // Reset textarea height after sending
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.style.height = '44px';
      }
    }, 100);

    // Check for personalized overrides first
    const override = getPersonalizedOverride(input, activeName);
    if (override) {
      setTimeout(() => {
        const botMessage = {
          id: Date.now() + 1,
          role: 'bot',
          content: override,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setActiveMessages((prev) => [...prev, botMessage]);
        setLoading(false);
      }, 1000);
      return;
    }

    try {
      const functionsBase = process.env.NODE_ENV === 'production'
        ? 'https://rohanm.org' // Use the actual domain for production
        : 'http://localhost:8888';

      // console.log('Making API call to:', `${functionsBase}/.netlify/functions/ask-rohan`);
      // console.log('Environment:', process.env.NODE_ENV);
      // console.log('Request body:', { message: input, name });

      // Test if the function endpoint exists
      // const testResponse = await fetch(`${functionsBase}/.netlify/functions/ask-rohan`, {
      //   method: 'GET',
      // });
      // console.log('Function test response:', testResponse.status);

      const response = await fetch(`${functionsBase}/.netlify/functions/ask-rohan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          name: activeName,
          conversationHistory: activeMessages.slice(-10), // Last 10 messages for context
        }),
      });

      // console.log('Response status:', response.status);
      // console.log('Response ok:', response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Network response was not ok: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      // console.log('Response data:', data);

      const botMessage = {
        id: Date.now() + 1,
        role: 'bot',
        content: data.response || getGeneralResponse(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setActiveMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);

      // Provide a more helpful error message
      let errorMessage = 'Sorry, I\'m having trouble connecting right now. ';
      if (error.message.includes('404')) {
        errorMessage += 'The API service is temporarily unavailable. Please try again later.';
      } else if (error.message.includes('Network')) {
        errorMessage += 'Please check your internet connection and try again.';
      } else {
        errorMessage += `Error: ${error.message}. Please try again.`;
      }

      const botMessage = {
        id: Date.now() + 1,
        role: 'bot',
        content: errorMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setActiveMessages((prev) => [...prev, botMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      askRohan();
    }
    // Allow Shift+Enter for new lines
  };

  return (
    <div id={rootId}>
      <div className="mobile-chat-container">
        {/* Header */}
        <div className="chat-header">
          <div className="header-content">
            <div className="bot-avatar">
              <img src={`${PUBLIC_URL}/profile.jpg`} alt="Rohan" className="avatar-img" loading="lazy" decoding="async" />
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

        {/* Messages - Now at the top */}
        <div className="messages-container" ref={chatEndRef}>
          {activeMessages.length === 0 && (
            <div className="welcome-message">
              <div className="welcome-icon" />
              <h4>Welcome to RohanGPT!</h4>
              <p>Ask me anything! Just include your name and question.</p>
            </div>
          )}

          {activeMessages.map((msg) => (
            <div key={msg.id} className={`message ${msg.role === 'user' ? 'user' : 'bot'}`}>
              <div className="message-avatar">
                {msg.role === 'user' ? (
                  <div className="user-avatar">
                    <span className="user-name">{msg.name ? msg.name.charAt(0).toUpperCase() : 'U'}</span>
                  </div>
                ) : (
                  <img src={`${PUBLIC_URL}/profile.jpg`} alt="Rohan" className="avatar-img" loading="lazy" decoding="async" />
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
                <img src={`${PUBLIC_URL}/profile.jpg`} alt="Rohan" className="avatar-img" loading="lazy" decoding="async" />
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

        {/* Input - Now at the bottom */}
        <div className="input-container">
          <div className="input-column">
            <div className="message-input-wrapper">
              <div className="input-with-icon">
                <i className="fas fa-comment input-icon" />
                <textarea
                  ref={inputRef}
                  placeholder={messagePlaceholder}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="message-input"
                  maxLength={500}
                  rows={1}
                />
              </div>
            </div>
            <div className="bottom-row">
              <div className="name-input-wrapper">
                <div className="input-with-icon">
                  <i className="fas fa-user input-icon" />
                  <input
                    type="text"
                    placeholder="Your name"
                    value={activeName}
                    onChange={(e) => setActiveName(e.target.value)}
                    className="name-input"
                    maxLength={20}
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={askRohan}
                disabled={!input.trim() || !activeName.trim() || loading}
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

RohanGPT.propTypes = {
  rootId: PropTypes.string,
  messagePlaceholder: PropTypes.string,
};

RohanGPT.defaultProps = {
  rootId: 'rohangpt',
  messagePlaceholder: 'Ask RohanGPT anything...',
};

export default RohanGPT;
