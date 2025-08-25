import React, { useState, useEffect, useRef } from 'react';
import Main from '../layouts/Main';

const RohanGPT = () => {
  const [name, setName] = useState('');
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  // Auto-scroll to bottom when new messages come in
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const askRohan = async () => {
    if (!name || !question) return;

    const userMsg = { role: 'user', content: `${name}: ${question}` };
    setMessages((prev) => [...prev, userMsg]);
    setQuestion('');
    setLoading(true);

    try {
      // Call Netlify serverless function instead of OpenAI directly
      const res = await fetch('/.netlify/functions/ask-rohan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, question }),
      });

      const data = await res.json();

      const botMsg = {
        role: 'bot',
        content: data.reply || '⚠️ No reply from Rohan GPT',
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Error talking to Rohan GPT:', err);
      setMessages((prev) => [
        ...prev,
        { role: 'bot', content: '⚠️ Error: Could not reach Rohan GPT.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Main>
      <article className="post">
        <h2>🤖 Rohan GPT</h2>
        <div
          style={{
            border: '1px solid #ccc',
            borderRadius: '5px',
            padding: '10px',
            height: '300px',
            overflowY: 'auto',
            marginBottom: '10px',
            background: '#fafafa',
          }}
        >
          {messages.length === 0 && (
            <p style={{ color: '#888' }}>Start a conversation with Rohan GPT!</p>
          )}
          {messages.map((msg, idx) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={idx}
              style={{
                margin: '5px 0',
                color: msg.role === 'user' ? '#222' : '#0077cc',
                fontWeight: msg.role === 'user' ? 'bold' : 'normal',
              }}
            >
              {msg.content}
            </div>
          ))}
          {loading && <p style={{ color: '#888' }}>Rohan GPT is typing...</p>}
          <div ref={chatEndRef} />
        </div>

        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginRight: '5px' }}
        />
        <input
          type="text"
          placeholder="Ask something..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          style={{ marginRight: '5px', width: '50%' }}
          onKeyDown={(e) => e.key === 'Enter' && askRohan()}
        />
        <button type="button" onClick={askRohan} disabled={loading}>
          {loading ? '...' : 'Ask'}
        </button>
      </article>
    </Main>
  );
};

export default RohanGPT;
