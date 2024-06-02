// src/components/MessageInput.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMessage } from '../redux/messagesSlice';
import db from '../firebase';
import './MessageInput.css';

const MessageInput = () => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (message.trim() === '') return;

    dispatch(addMessage(message));
    db.collection('messages').add({ text: message });
    setMessage('');
  };

  return (
    <div className="message-input-container">
      <input
        className="message-input"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message"
      />
      <button className="submit-button" onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default MessageInput;