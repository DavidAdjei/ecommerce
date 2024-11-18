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
import { fetchMessages, getChats, setMessages } from '../../../redux/Actions/chatActions';
import { useMediaQuery } from '@mui/material';

const socket = io('http://localhost:8000');

function ChatRoom() {
  const { user } = useSelector((state) => state.auth);
  const { contacts, messages } = useSelector((state) => state.chatReducer);
  const dispatch = useDispatch();
  const { id, participant } = useParams();
  const [currentChat, setCurrentChat] = useState(null);
  const [currentOther, setCurrentOther] = useState(null);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    socket.connect();

    socket.emit("userOnline", { userId: user._id });

    socket.on("onlineStatus", ({ userId, online }) => {
      if (userId !== user._id) {
        dispatch(getChats(user._id));
      }
    })

    return () => {
      socket.disconnect();
    };
  }, [user, dispatch]);

  useEffect(() => {
    dispatch(getChats(user._id));
    if (id && participant) {
      setCurrentChat(id);
      setCurrentOther(participant);
      dispatch(fetchMessages(id));
      socket.emit('joinRoom', { userId: user._id, roomId: id });
      socket.on('joined room', () => {
        dispatch(getChats(user._id));
      });
    }

    return () => {
      socket.emit('leaveRoom', id);
    };
  }, [id, user, dispatch, participant]);  

  const handleSendMessage = async (message, messageType) => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_SERVER}/chat/sendMessage`, {
        message,
        messageType,
        roomId: currentChat,
        userId: user._id,
      });
      socket.emit('chatMessage', { message: data.savedMessage });
      dispatch(setMessages([...messages, data.savedMessage]));

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="chat-room">
      {isMobile ? (
        <>
          {!currentChat || !id || !participant ? (
            <ContactList contacts={contacts} currentChat={currentChat} setCurrentChat={setCurrentChat} socket={socket}/>
          ) : (
            <div className="chat-area">
              <ChatHeader contact={contacts.find((c) => c.id === currentOther)} socket={socket}/>
              <ChatMessages roomId={currentChat} socket={socket} />
              <ChatInput onSendMessage={handleSendMessage} socket={socket}/>
            </div>
          )}
        </>
      ) : (
        <>
          <ContactList contacts={contacts} currentChat={currentChat} setCurrentChat={setCurrentChat} socket={socket}/>
          {currentChat && (
            <div className="chat-area">
              <ChatHeader contact={contacts.find((c) => c.id === currentOther)} socket={socket}/>
              <ChatMessages roomId={currentChat} socket={socket}/>
              <ChatInput onSendMessage={handleSendMessage} socket={socket}/>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ChatRoom;
