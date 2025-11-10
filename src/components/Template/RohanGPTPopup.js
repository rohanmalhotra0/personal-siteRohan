import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RohanGPTPopup = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    try {
      const raw = window.localStorage.getItem('popup_rgpt_messages');
      return raw ? JSON.parse(raw) : [];
    } catch (_) {
      return [];
    }
  });
  const [name, setName] = useState(() => {
    try {
      return window.localStorage.getItem('popup_rgpt_name') || '';
    } catch (_) {
      return '';
    }
  });
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const messagesRef = useRef(null);

  const toggle = () => setOpen((v) => !v);

  const goFull = () => {
    setOpen(false);
    navigate('/rohanai');
  };

  // Persist popup conversation
  useEffect(() => {
    try {
      window.localStorage.setItem('popup_rgpt_messages', JSON.stringify(messages));
    } catch (_) {
      // ignore
    }
  }, [messages]);
  useEffect(() => {
    try {
      window.localStorage.setItem('popup_rgpt_name', name || '');
    } catch (_) {
      // ignore
    }
  }, [name]);
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages, open]);

  // Theme detection: match site theme (no OS fallback)
  let isDark = false;
  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    isDark = root.classList.contains('theme-dark') || document.body.classList.contains('theme-dark');
  }

  const colors = {
    // Floating icon button
    fabBg: isDark ? 'rgba(18,24,33,0.9)' : '#ffffff',
    fabBorder: isDark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.18)',
    fabIcon: isDark ? '#ffffff' : '#000000',
    // Popup shell
    shellBg: isDark ? 'rgba(18,24,33,0.92)' : '#ffffff',
    shellBorder: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)',
    text: isDark ? '#ffffff' : '#000000',
    // Header
    headerBg: isDark ? 'rgba(24,119,242,0.12)' : 'rgba(24,119,242,0.05)',
    headerBorder: isDark ? 'rgba(24,119,242,0.25)' : 'rgba(0,0,0,0.08)',
    // Buttons
    primaryBg: isDark ? 'rgba(24,119,242,0.18)' : 'rgba(24,119,242,0.10)',
    primaryBorder: isDark ? 'rgba(24,119,242,0.35)' : 'rgba(24,119,242,0.25)',
    primaryText: isDark ? '#E3EEFF' : '#184F9E',
    subtleBg: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.9)',
    subtleBorder: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)',
  };

  const dialogBoxShadow = isDark
    ? '0 18px 40px rgba(0,0,0,0.25)'
    : '0 12px 30px rgba(0,0,0,0.12)';

  const askPopup = async () => {
    if (!input.trim() || !name.trim() || loading) return;

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = {
      id: Date.now(),
      role: 'user',
      content: input,
      timestamp: now,
      name,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      let functionsBase = 'https://rohanm.org';
      if (process.env.NODE_ENV !== 'production') {
        if (process.env.REACT_APP_FUNCTIONS_BASE) {
          functionsBase = process.env.REACT_APP_FUNCTIONS_BASE;
        } else if (typeof window !== 'undefined') {
          const { location } = window;
          const isLocalhost = ['localhost', '127.0.0.1'].includes(location.hostname);
          if (isLocalhost) {
            functionsBase = location.port === '3000' ? 'http://localhost:8888' : `${location.protocol}//${location.hostname}:${location.port || '8888'}`;
          }
        } else {
          functionsBase = 'http://localhost:8888';
        }
      }

      const response = await fetch(`${functionsBase}/.netlify/functions/ask-rohan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg.content,
          name,
          conversationHistory: messages.slice(-10),
        }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
      const data = await response.json();
      const botMsg = {
        id: Date.now() + 1,
        role: 'bot',
        content: data.response || 'Thanks! I’ll get back to you.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (e) {
      const botMsg = {
        id: Date.now() + 1,
        role: 'bot',
        content: 'Sorry, I can’t connect right now. Please try again shortly.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setLoading(false);
    }
  };

  const onKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      askPopup();
    }
  };

  return (
    <>
      {/* Floating Action Button - Robot icon */}
      <button
        type="button"
        aria-label="Open RohanGPT"
        onClick={toggle}
        style={{
          position: 'fixed',
          right: '20px',
          bottom: '20px',
          zIndex: 1000,
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: `1px solid ${colors.fabBorder}`,
          background: colors.fabBg,
          backdropFilter: 'saturate(160%) blur(10px)',
          WebkitBackdropFilter: 'saturate(160%) blur(10px)',
          color: colors.fabIcon,
          boxShadow: '0 12px 30px rgba(0,0,0,0.22)',
          cursor: 'pointer',
        }}
      >
        {/* Simple robot SVG icon */}
        <svg
          width="56"
          height="56"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <rect x="4" y="6" width="16" height="12" rx="3" stroke={colors.fabIcon} strokeWidth="1.8" />
          <circle cx="9" cy="12" r="1.5" fill={colors.fabIcon} />
          <circle cx="15" cy="12" r="1.5" fill={colors.fabIcon} />
          <rect x="9" y="15.5" width="6" height="1.6" rx="0.8" fill={colors.fabIcon} />
          <line x1="12" y1="3" x2="12" y2="6" stroke={colors.fabIcon} strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="12" cy="3" r="1.2" fill={colors.fabIcon} />
        </svg>
      </button>

      {/* Popup */}
      {open && (
        <>
          <div
            onClick={toggle}
            aria-hidden="true"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.08)',
              backdropFilter: 'none',
              WebkitBackdropFilter: 'none',
              zIndex: 999,
            }}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="RohanGPT Chat"
            style={{
              position: 'fixed',
              right: '20px',
              bottom: '80px',
              width: '320px',
              maxWidth: '90vw',
              height: '460px',
              maxHeight: '75vh',
              zIndex: 1000,
              borderRadius: '16px',
              overflow: 'hidden',
              border: `1px solid ${colors.shellBorder}`,
              background: colors.shellBg,
              backdropFilter: 'saturate(160%) blur(12px)',
              WebkitBackdropFilter: 'saturate(160%) blur(12px)',
              boxShadow: dialogBoxShadow,
              display: 'flex',
              flexDirection: 'column',
              color: colors.text,
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr auto',
                alignItems: 'center',
                padding: '12px',
                background: colors.headerBg,
                borderBottom: `1px solid ${colors.headerBorder}`,
                color: colors.text,
                gap: '10px',
              }}
            >
              <strong style={{ fontSize: '0.95rem', color: colors.text }}>RohanGPT</strong>
              <div />
              <button
                type="button"
                onClick={goFull}
                style={{
                  border: `1px solid ${isDark ? colors.primaryBorder : 'rgba(0,0,0,0.12)'}`,
                  background: isDark ? colors.primaryBg : '#ffffff',
                  color: colors.text,
                  borderRadius: '10px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '28px',
                  minHeight: '28px',
                  padding: '0 10px',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  lineHeight: 1,
                }}
              >
                Open full
              </button>
            </div>
            {/* Simple chat body */}
            <div
              style={{
                flex: 1,
                minHeight: 0,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                ref={messagesRef}
                style={{
                  flex: 1,
                  overflowY: 'auto',
                  padding: '10px',
                  background: isDark ? 'rgba(18,24,33,0.92)' : '#ffffff',
                }}
              >
                {messages.length === 0 && (
                  <div
                    style={{
                      textAlign: 'center',
                      color: colors.text,
                      padding: '16px 8px',
                    }}
                  >
                    Welcome to RohanGPT!
                  </div>
                )}
                {messages.map((m) => {
                  const isUser = m.role === 'user';
                  let bubbleBg;
                  if (isUser) {
                    bubbleBg = isDark ? 'rgba(24,119,242,0.18)' : '#f4f7fb';
                  } else {
                    bubbleBg = isDark ? 'rgba(255,255,255,0.06)' : '#ffffff';
                  }
                  let bubbleBorder;
                  if (isUser) {
                    bubbleBorder = isDark ? 'rgba(24,119,242,0.35)' : 'rgba(24,119,242,0.25)';
                  } else {
                    bubbleBorder = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)';
                  }
                  return (
                    <div
                      key={m.id}
                      style={{
                        display: 'flex',
                        justifyContent: isUser ? 'flex-end' : 'flex-start',
                        marginBottom: '8px',
                      }}
                    >
                      <div
                        style={{
                          background: bubbleBg,
                          color: isDark ? '#ffffff' : '#0a0c10',
                          border: `1px solid ${bubbleBorder}`,
                          padding: '8px 10px',
                          borderRadius: '12px',
                          maxWidth: '85%',
                          wordBreak: 'break-word',
                          boxSizing: 'border-box',
                        }}
                      >
                        <div style={{ marginBottom: '4px' }}>{m.content}</div>
                        <div style={{ fontSize: '11px', opacity: 0.7 }}>{m.timestamp}</div>
                      </div>
                    </div>
                  );
                })}
                {loading && (
                  <div style={{ color: colors.text, fontSize: '12px', opacity: 0.7 }}>Typing…</div>
                )}
              </div>
              <div
                style={{
                  borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)'}`,
                  padding: '8px',
                  background: isDark ? 'rgba(18,24,33,0.92)' : '#ffffff',
                }}
              >
                <div style={{ marginBottom: '8px' }}>
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={onKeyPress}
                    rows={2}
                    placeholder=""
                    style={{
                      width: '100%',
                      border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.15)'}`,
                      background: isDark ? 'rgba(18,24,33,0.92)' : '#ffffff',
                      color: colors.text,
                      borderRadius: '10px',
                      padding: '8px',
                      resize: 'vertical',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '8px' }}>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    style={{
                      width: '100%',
                      border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.15)'}`,
                      background: isDark ? 'rgba(18,24,33,0.92)' : '#ffffff',
                      color: colors.text,
                      borderRadius: '10px',
                      padding: '8px',
                      boxSizing: 'border-box',
                    }}
                  />
                  <button
                    type="button"
                    onClick={askPopup}
                    disabled={!input.trim() || !name.trim() || loading}
                    style={{
                      border: `1px solid ${isDark ? colors.primaryBorder : 'rgba(0,0,0,0.12)'}`,
                      background: isDark ? colors.primaryBg : '#ffffff',
                      color: colors.text,
                      borderRadius: '10px',
                      height: '28px',
                      padding: '0 10px',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      lineHeight: 1,
                    }}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default RohanGPTPopup;
