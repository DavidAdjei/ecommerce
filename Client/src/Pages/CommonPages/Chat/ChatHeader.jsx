import React from 'react';
import { AccountCircle } from '@mui/icons-material'; // Import the avatar icon

function ChatHeader({ contact }) {
  return (
    <div className="chat-header">
      {contact?.image?.url ? (
        <img 
          src={contact.image.url} 
          alt={contact.name || "Contact"} 
          className="avatar" 
        />
      ) : (
        <AccountCircle fontSize="large" className="avatar-icon" /> 
      )}
      <div className="contact-info">
        <h3>{contact?.name}</h3>
        <p className="status">online now</p>
      </div>
    </div>
  );
}

export default ChatHeader;
