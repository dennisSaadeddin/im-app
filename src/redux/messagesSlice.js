import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import db from '../firebase';

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async () => {
    const snapshot = await db.collection('messages').orderBy('timestamp').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addMessage: (state, action) => {
      state.push(action.payload);
    },
    removeMessage: (state, action) => {
      return state.filter(message => message.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { addMessage, removeMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
