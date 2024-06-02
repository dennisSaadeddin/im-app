import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMessage, removeMessage, fetchMessages } from '../redux/messagesSlice';
import db from '../firebase';
import './MessageQueue.css';

const MessageQueue = () => {
  const messages = useSelector((state) => state.messages);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMessages());

    const unsubscribe = db.collection('messages')
      .orderBy('timestamp')
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            dispatch(addMessage({ id: change.doc.id, ...change.doc.data() }));
          } else if (change.type === 'removed') {
            dispatch(removeMessage(change.doc.id));
          }
        });
      });

    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    messages.forEach((message) => {
      const timer = setTimeout(() => {
        db.collection('messages').doc(message.id).delete();
      }, 5000);

      return () => clearTimeout(timer);
    });
  }, [messages]);

  return (
    <div className="message-queue-container">
      {messages.map((message) => (
        <div className="message" key={message.id}>{message.text}</div>
      ))}
    </div>
  );
};

export default MessageQueue;