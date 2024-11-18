import React, { useState } from 'react';

function ChatInput({ onSendMessage }) {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('text');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message, messageType);
      setMessage('');
    }
  };

  return (
    <form className="chat-input" onSubmit={handleSendMessage}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message and press enter..."
      />
      <button type="submit">➤</button>
    </form>
  );
}

export default ChatInput;
