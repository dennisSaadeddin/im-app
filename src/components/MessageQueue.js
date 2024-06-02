import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeMessage } from '../redux/messagesSlice';
import db from '../firebase';
import './MessageQueue.css';

const MessageQueue = () => {
  const messages = useSelector((state) => state.messages);
  const dispatch = useDispatch();

  useEffect(() => {
    messages.forEach((message) => {
      const timer = setTimeout(() => {
        dispatch(removeMessage(message.id));
        db.collection('messages')
          .where('text', '==', message.text)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              doc.ref.delete();
            });
          });
      }, 5000);

      return () => clearTimeout(timer);
    });
  }, [messages, dispatch]);

  return (
    <div className="message-queue-container">
      {messages.map((message) => (
        <div className="message" key={message.id}>{message.text}</div>
      ))}
    </div>
  );
};

export default MessageQueue;