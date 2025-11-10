import React, {
  createContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import PropTypes from 'prop-types';

export const ConversationContext = createContext(null);

export const ConversationProvider = ({ children }) => {
  const [messages, setMessages] = useState(() => {
    try {
      const raw = window.localStorage.getItem('rgpt_messages');
      return raw ? JSON.parse(raw) : [];
    } catch (_) {
      return [];
    }
  });

  const [name, setName] = useState(() => {
    try {
      return window.localStorage.getItem('rgpt_name') || '';
    } catch (_) {
      return '';
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('rgpt_messages', JSON.stringify(messages));
    } catch (_) {
      // ignore storage errors
    }
  }, [messages]);

  useEffect(() => {
    try {
      window.localStorage.setItem('rgpt_name', name || '');
    } catch (_) {
      // ignore storage errors
    }
  }, [name]);

  const resetConversation = () => {
    setMessages([]);
  };

  const value = useMemo(() => ({
    messages,
    setMessages,
    name,
    setName,
    resetConversation,
  }), [messages, name]);

  return (
    <ConversationContext.Provider value={value}>
      {children}
    </ConversationContext.Provider>
  );
};

ConversationProvider.propTypes = {
  children: PropTypes.node,
};

ConversationProvider.defaultProps = {
  children: null,
};
