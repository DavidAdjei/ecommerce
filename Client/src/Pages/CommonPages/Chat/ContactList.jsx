import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFeedback } from '../../../redux/Actions/productActions';
import { createOrNavigateToRoom, getChats } from '../../../redux/Actions/chatActions';
import { useNavigate } from 'react-router-dom';
import { AccountCircle } from '@mui/icons-material';


function ContactList({ currentChat, socket }) {
  const { contacts } = useSelector((state) => state.chatReducer);
  const { user } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('joined room', () => {
        dispatch(getChats(user._id));
    });

    return () => {
        socket.off('joined room');
    };
}, [dispatch, user, socket]);


  const handleClick = (contactId) => {
    if (!user) {
      dispatch(setFeedback({ error: "You need to login first" }));
    } else {
      dispatch(createOrNavigateToRoom(user._id, contactId)).then((res) => {
        socket.emit('joinRoom', { userId: user._id, roomId: res.roomId });
        navigate(`/chat/${res.roomId}/${contactId}`);
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
