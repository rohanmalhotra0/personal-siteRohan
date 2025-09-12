import React, { useState, useRef, useEffect } from 'react';
import Main from '../layouts/Main';

// Generate RohanGPT responses
const getGeneralResponse = (question) => {
  const lowerQuestion = question.toLowerCase();

  // Rohan-specific questions
  if (lowerQuestion.includes('rohan') || lowerQuestion.includes('about rohan') || lowerQuestion.includes('who is rohan')) {
    return 'Rohan is a sophomore at NYU studying Computer Science + Economics with a Math minor. He\'s a Software Intern, Web Developer, and aspiring Software Dev and Actuary. He works on CubeSat imaging research, has research publications, runs a Physics Club called PIVOT, and does finance/ML modeling. His hobbies include basketball, fantasy football, and weightlifting. He\'s playful, witty, and sometimes roasts his friends! 😄';
  }

  if (lowerQuestion.includes('projects') || lowerQuestion.includes('work')) {
    return 'Rohan has several cool projects! He built Refrax.io - an interactive platform for financial and scientific visualization using Three.js and Plotly.js. He\'s also done CubeSat research at the Hume Center, published papers on Reddit sentiment analysis and capital allocation, and works on ML models for financial prediction. Pretty impressive stuff! 🚀';
  }

  if (lowerQuestion.includes('research') || lowerQuestion.includes('publications')) {
    return 'Rohan has published research on Reddit sentiment analysis and market volatility, plus work on capital allocation using the Kelly Criterion. He\'s also done CubeSat research at the Hume Center, working on autonomous imaging and communication systems for NASA proposals. The guy\'s got some serious academic chops! 📚';
  }

  if (lowerQuestion.includes('nyu') || lowerQuestion.includes('school') || lowerQuestion.includes('university')) {
    return 'Rohan is a sophomore at NYU studying Computer Science + Economics with a Math minor. He\'s at the Courant Institute and seems to be doing really well academically! 🎓';
  }

  if (lowerQuestion.includes('hobbies') || lowerQuestion.includes('basketball') || lowerQuestion.includes('fantasy football')) {
    return 'Rohan loves basketball, fantasy football, and weightlifting! He\'s pretty active and competitive. You should challenge him to a game sometime! 🏀';
  }

  if (lowerQuestion.includes('contact') || lowerQuestion.includes('email') || lowerQuestion.includes('reach')) {
    return 'You can reach Rohan through his website! He\'s got contact info and social media links there. He\'s pretty responsive, so don\'t hesitate to reach out! 📧';
  }

  // Default responses
  const responses = [
    'That\'s an interesting question! Rohan would probably have a witty response to that. What else can I help you with? 🤔',
    'Hmm, I\'m not sure about that one. Maybe ask Rohan directly - he\'s pretty smart! 😅',
    'Good question! Rohan\'s got lots of experience with different projects and research. Want to know more about his work? 💭',
    'I\'m not entirely sure about that, but Rohan\'s always learning new things. What else would you like to know? 🤷‍♂️',
    'That\'s a tough one! Rohan might have some insights on that. Want to ask about his projects or research instead? 🧠',
  ];

  return responses[Math.floor(Math.random() * responses.length)];
};

const generateRohanResponse = (name, question) => {
  const lowerQuestion = question.toLowerCase();
  const lowerName = name.toLowerCase();

  // Friend-specific responses
  if (lowerName === 'colin' || lowerName === 'cpk' || lowerName === 'col' || lowerName === 'cman' || lowerName === 'cp3' || lowerName === 'cpl' || lowerName === 'co2') {
    if (lowerQuestion.includes('drink') || lowerQuestion.includes('water')) {
      return 'Slow down, you\'ve had enough, CPK! Maybe try some Coke instead? 😄';
    }
    return `Hey CPK! ${getGeneralResponse(question)}`;
  }

  if (lowerName === 'tomas' || lowerName === 'thomas') {
    if (lowerQuestion.includes('drink')) {
      return 'Take a big sip for me! You barely had any anyway 😏';
    }
    return `Hey Tomas! ${getGeneralResponse(question)}`;
  }

  if (lowerName === 'abby' || lowerName === 'abbie') {
    if (lowerQuestion.includes('drink')) {
      return 'That might not be a good idea, Abby. You already seem out of it! 😅';
    }
    return `Hey Abby! ${getGeneralResponse(question)}`;
  }

  if (lowerName === 'olivia' || lowerName === 'nadia' || lowerName === 'sydney') {
    if (lowerQuestion.includes('drink')) {
      return `That might not be a good idea, ${name}. You already seem out of it! 😅`;
    }
    return `Hey ${name}! ${getGeneralResponse(question)}`;
  }

  if (lowerName === 'gavin' || lowerName === 'connor' || lowerName === 'pranav' || lowerName === 'rohan') {
    if (lowerQuestion.includes('drink')) {
      return 'Take a big sip for me! 🍻';
    }
    return `Hey ${name}! ${getGeneralResponse(question)}`;
  }

  return getGeneralResponse(question);
};

const RohanGPT = () => {
  const [name, setName] = useState('');
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  const askRohan = async () => {
    if (!name.trim() || !question.trim() || loading) return;

    const userMessage = {
      id: Date.now() + Math.random().toString(36).substr(2, 9),
      role: 'user',
      content: question,
    };
    setMessages((prev) => [...prev, userMessage]);
    setQuestion('');
    setLoading(true);

    try {
      // Call the Netlify function
      const response = await fetch('/.netlify/functions/ask-rohan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          question: question.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const botMessage = {
        id: Date.now() + Math.random().toString(36).substr(2, 9),
        role: 'assistant',
        content: data.reply,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      // Fallback to local response if API fails
      const fallbackResponse = generateRohanResponse(name.trim(), question.trim());
      const errorMessage = {
        id: Date.now() + Math.random().toString(36).substr(2, 9),
        role: 'assistant',
        content: fallbackResponse,
      };
      setMessages((prev) => [...prev, errorMessage]);
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
    <Main>
      <article id="rohangpt" className="post">
        <div className="chat-container">
          <div className="chat-header">
            <div className="chat-info">
              <h3>RohanGPT</h3>
              <p>AI Assistant</p>
            </div>
            <div className="chat-status">
              <div className={`status-indicator ${loading ? 'typing' : 'online'}`}>
                <i className={`fas ${loading ? 'fa-ellipsis-h' : 'fa-circle'}`} />
                {loading ? 'Typing...' : 'Online'}
              </div>
            </div>
          </div>

          <div className="chat-messages" ref={chatEndRef}>
            {messages.length === 0 && (
              <div className="welcome-message">
                <div className="welcome-icon">
                  <i className="fas fa-hand-wave" />
                </div>
                <h4>Welcome to RohanGPT!</h4>
                <p>
                  Ask me anything just include your name and question.
                </p>
              </div>
            )}

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`message ${msg.role === 'user' ? 'user-message' : 'bot-message'}`}
              >
                <div className="message-avatar">
                  {msg.role === 'user' ? (
                    <span className="avatar-text">{name}</span>
                  ) : (
                    <span className="avatar-text">Rohan</span>
                  )}
                </div>
                <div className="message-content">
                  <div className="message-text">{msg.content}</div>
                  <div className="message-time">
                    {new Date().toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="message bot-message typing">
                <div className="message-avatar">
                  <i className="fas fa-robot" />
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

          <div className="chat-input-container">
            <div className="input-group">
              <div className="name-input-wrapper">
                <i className="fas fa-user input-icon" />
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="name-input"
                  onKeyPress={handleKeyPress}
                />
              </div>
              <div className="question-input-wrapper">
                <input
                  type="text"
                  placeholder="Ask RohanGPT anything..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="question-input"
                  onKeyPress={handleKeyPress}
                />
              </div>
              <button
                type="button"
                onClick={askRohan}
                disabled={loading || !name.trim() || !question.trim()}
                className="send-button"
              >
                {loading ? (
                  <i className="fas fa-spinner fa-spin" />
                ) : (
                  'Send'
                )}
              </button>
            </div>
          </div>
        </div>
      </article>
    </Main>
  );
};

export default RohanGPT;
