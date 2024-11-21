import React from 'react';
import { AccountCircle } from '@mui/icons-material'; 
import { useMediaQuery } from '@mui/material';
import Back from '../../../features/back';

function ChatHeader({ contact }) {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className="chat-header">
      {isMobile && <Back/>}
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
        <p className="status">{ contact?.online ? "Online" : `Last seen ${contact?.lastSeen}`}</p>
      </div>
    </div>
  );
}

export default ChatHeader;
