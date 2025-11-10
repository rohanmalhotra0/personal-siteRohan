import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RohanGPT from '../../pages/RohanGPT';

const RohanGPTPopup = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggle = () => setOpen((v) => !v);

  const goFull = () => {
    setOpen(false);
    navigate('/rohanai');
  };

  // Theme detection (prefers site toggle with `.theme-dark`, then OS fallback)
  const isDark = (
    (typeof document !== 'undefined'
      && (document.documentElement.classList.contains('theme-dark')
        || document.body.classList.contains('theme-dark')))
    || (typeof window !== 'undefined'
      && window.matchMedia
      && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );

  const colors = {
    // Floating icon button
    fabBg: isDark ? 'rgba(18,24,33,0.9)' : 'rgba(255,255,255,0.85)',
    fabBorder: isDark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.12)',
    fabIcon: isDark ? '#ffffff' : '#0a0c10',
    // Popup shell
    shellBg: isDark ? 'rgba(18,24,33,0.92)' : 'rgba(255,255,255,0.92)',
    shellBorder: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)',
    text: isDark ? '#ffffff' : '#0a0c10',
    // Header
    headerBg: isDark ? 'rgba(24,119,242,0.12)' : 'rgba(24,119,242,0.06)',
    headerBorder: isDark ? 'rgba(24,119,242,0.25)' : 'rgba(24,119,242,0.2)',
    // Buttons
    primaryBg: isDark ? 'rgba(24,119,242,0.18)' : 'rgba(24,119,242,0.12)',
    primaryBorder: isDark ? 'rgba(24,119,242,0.35)' : 'rgba(24,119,242,0.3)',
    primaryText: isDark ? '#E3EEFF' : '#184F9E',
    subtleBg: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.7)',
    subtleBorder: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)',
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
              boxShadow: '0 18px 40px rgba(0,0,0,0.25)',
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
              <strong style={{ fontSize: '0.95rem' }}>RohanGPT</strong>
              <div />
              <button
                type="button"
                onClick={goFull}
                style={{
                  border: `1px solid ${colors.primaryBorder}`,
                  background: colors.primaryBg,
                  color: colors.primaryText,
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
            {/* Embed the chat with a distinct root id to avoid duplicate IDs */}
            <div style={{ flex: 1, minHeight: 0 }}>
              {/* Scoped compact overrides for popup instance */}
              <style>
                {`
                #rohangpt-popup .mobile-chat-container {
                  height: 100%;
                  background: transparent !important;
                  border-radius: 0;
                }
                /* Simplify header/content inside popup */
                #rohangpt-popup .chat-header { display: none !important; }
                #rohangpt-popup .status-indicator { display: none !important; }
                #rohangpt-popup .bot-info { display: none !important; }
                #rohangpt-popup .chat-header {
                  padding: 8px 10px !important;
                }
                #rohangpt-popup .chat-header h3 {
                  font-size: 1rem !important;
                  margin: 0;
                }
                #rohangpt-popup .chat-header p,
                #rohangpt-popup .status-indicator span {
                  font-size: 0.8rem !important;
                }
                #rohangpt-popup .messages-container {
                  flex: 1 1 auto !important;
                  height: auto !important;
                  padding: 10px !important;
                }
                #rohangpt-popup .welcome-message h4 {
                  font-size: 1rem !important;
                  margin-bottom: 6px !important;
                }
                /* Only show the heading: "Welcome to RohanGPT!" */
                #rohangpt-popup .welcome-message p { display: none !important; }
                #rohangpt-popup .message .message-bubble {
                  font-size: 0.92rem !important;
                  line-height: 1.35 !important;
                }
                #rohangpt-popup .input-container {
                  padding: 8px !important;
                }
                /* Add spacing between text area and bottom row to detach send button */
                #rohangpt-popup .message-input-wrapper { margin-bottom: 8px !important; }
                /* Use grid to prevent overlap: name input expands, button stays auto width */
                #rohangpt-popup .bottom-row {
                  display: grid !important;
                  grid-template-columns: 1fr auto !important;
                  gap: 10px !important;
                  align-items: center !important;
                }
                #rohangpt-popup .name-input-wrapper { min-width: 0 !important; width: 100% !important; }
                #rohangpt-popup .name-input { width: 100% !important; }
                #rohangpt-popup .send-button {
                  border-radius: 10px !important;
                  margin-left: 6px !important;
                  height: 28px !important;
                  padding: 0 10px !important;
                  font-size: 0.85rem !important;
                  line-height: 1 !important;
                  display: inline-flex !important;
                  align-items: center !important;
                  justify-content: center !important;
                }
                /* Remove message/user icons and adjust padding */
                #rohangpt-popup .input-icon { display: none !important; }
                #rohangpt-popup .input-with-icon .message-input,
                #rohangpt-popup .input-with-icon .name-input {
                  padding-left: 12px !important;
                }
                #rohangpt-popup .message-input,
                #rohangpt-popup .name-input {
                  font-size: 0.92rem !important;
                  min-height: 38px !important;
                }
                #rohangpt-popup .send-button {
                  padding: 6px 10px !important;
                  font-size: 0.9rem !important;
                  line-height: 1 !important;
                }
              `}
              </style>
              <RohanGPT rootId="rohangpt-popup" messagePlaceholder="" />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default RohanGPTPopup;
