import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFeedback } from '../../../redux/Actions/productActions';
import { createOrNavigateToRoom } from '../../../redux/Actions/chatActions';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { AccountCircle } from '@mui/icons-material'; // Import the avatar icon from Material-UI

const socket = io('http://localhost:8000');

function ContactList({ currentChat, setCurrentChat }) {
  const { contacts } = useSelector((state) => state.chatReducer);
  const { user } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (contactId) => {
    if (!user) {
      dispatch(setFeedback({ error: "You need to login first" }));
    } else {
      dispatch(createOrNavigateToRoom(user._id, contactId)).then((res) => {
        socket.emit('joinRoom', { userId: user._id, roomId: res.roomId });
        navigate(`/chat/${res.roomId}`);
      });
    }
  }

  return (
    <div className="contact-list">
      <input type="text" placeholder="Search" className="search-input" />
      {contacts.map((contact, index) => (
        <div
          key={index}
          className={`contact ${currentChat === contact.id ? 'active' : ''}`}
          onClick={() => handleClick(contact.id)}
        >
          {contact.avatar ? (
            <img src={contact.avatar} alt={contact.name} className="avatar" />
          ) : (
            <AccountCircle fontSize="large" className="avatar-icon" /> // Use the icon as a fallback
          )}
          <div className="contact-info">
            <h4>{contact.name}</h4>
            <p>{contact.lastMessage}</p>
          </div>
          {contact.unreadCount > 0 && <span className="unread-count">{contact.unreadCount}</span>}
        </div>
      ))}
    </div>
  );
}

export default ContactList;
