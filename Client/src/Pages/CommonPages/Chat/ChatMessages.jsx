import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../../../redux/Actions/chatActions';


function ChatMessages({ roomId, socket }) {
  const { user } = useSelector((state) => state.auth);
  const { messages } = useSelector((state) => state.chatReducer);
  const dispatch = useDispatch();
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    socket.on("newMessage", (message) => {
      console.log({message});
      dispatch(setMessages([...messages, message]))
    })

    return () => {
      socket.off('newMessage');
    };

  },[messages, dispatch, socket])

  return (
    <div className="chat-messages" ref={chatContainerRef}>
      {messages.map((msg, index) => (
        <div key={index} className={`message ${msg.userId === user._id ? 'own' : ''}`}>
          <p>{msg.message}</p>
          <div className="status">
            {msg.seenBy.includes(user._id) ? '✔✔' : msg.deliveredTo.includes(user._id) ? '✔' : ''}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatMessages;
