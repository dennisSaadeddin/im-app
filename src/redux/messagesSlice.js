// src/redux/messagesSlice.js
import { createSlice } from '@reduxjs/toolkit';

let nextMessageId = 0;

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addMessage: (state, action) => {
      state.push({ id: nextMessageId++, text: action.payload });
    },
    removeMessage: (state, action) => {
      return state.filter(message => message.id !== action.payload);
    },
  },
});

export const { addMessage, removeMessage } = messagesSlice.actions;
export default messagesSlice.reducer;