// src/App.js
import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import MessageInput from './components/MessageInput';
import MessageQueue from './components/MessageQueue';
import './App.css';

const App = () => (
  <Provider store={store}>
    <div className="app-container">
      <h1 className="app-title">Message Queue</h1>
      <MessageInput />
      <MessageQueue />
    </div>
  </Provider>
);

export default App;