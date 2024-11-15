import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../../../redux/Actions/chatActions';
import { io } from 'socket.io-client';

const socket = io('http://localhost:8000', { autoConnect: false });

function ChatMessages({ roomId }) {
  const { user } = useSelector((state) => state.auth);
  const { messages } = useSelector((state) => state.chatReducer);
  const dispatch = useDispatch();
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (roomId) {
      socket.connect();
      socket.emit('joinRoom', { userId: user._id, roomId });
    }

    socket.on('newMessage', (message) => {
      dispatch(setMessages([...messages, message]));
    });

    return () => {
      socket.off('newMessage');
      socket.disconnect();
    };
  }, [roomId, dispatch, messages, user]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-messages" ref={chatContainerRef}>
      {messages.map((msg, index) => (
        <div key={index} className={`message ${msg.userId === user._id ? 'own' : ''}`}>
          <p>{msg.message}</p>
        </div>
      ))}
    </div>
  );
}

export default ChatMessages;
