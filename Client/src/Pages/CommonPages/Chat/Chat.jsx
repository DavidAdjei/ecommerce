import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ContactList from './ContactList';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import io from 'socket.io-client';
import './chat.css';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { fetchMessages, getChats } from '../../../redux/Actions/chatActions';

const socket = io('http://localhost:8000');

function ChatRoom() {
  const {user} = useSelector((state) => state.auth);
  const {contacts} = useSelector((state) => state.chatReducer);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [currentChat, setCurrentChat] = useState(null);

  useEffect(() => {
    dispatch(getChats(user._id));
    if (id) {
      setCurrentChat(id);
      dispatch(fetchMessages(id));
    }
    socket.emit('joinRoom', { userId: user._id, roomId: id});

    return () => {
      socket.emit('leaveRoom', id);
    };
  }, [id, user, dispatch]);

  const handleSendMessage = async (message) => {
    try{
      const {data} = await axios.post(`${process.env.REACT_APP_SERVER}/chat/sendMessage`, {
        message,
        roomId: currentChat,
        userId: user._id
      });
      socket.emit('chatMessage', {message: data.savedMessage});
    }catch(error){
      console.log(error)
    }
  };

  return (
    <div className="chat-room">
      <ContactList contacts={contacts} currentChat={currentChat} setCurrentChat={setCurrentChat} />
      {currentChat && (
        <div className="chat-area">
          <ChatHeader contact={contacts.find((c) => c.id === currentChat)} />
          <ChatMessages roomId={currentChat} />
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      )}
    </div>
  );
}

export default ChatRoom;
