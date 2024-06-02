import React, { useState } from 'react';
import db from '../firebase';
import './MessageInput.css';
import firebase from "firebase/compat/app";

const MessageInput = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    if (message.trim() === '') return;

    const newMessage = {
      text: message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };

    await db.collection('messages').add(newMessage);
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