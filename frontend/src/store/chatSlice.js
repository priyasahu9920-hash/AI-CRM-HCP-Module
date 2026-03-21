import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const sendMessage = createAsyncThunk('chat/sendMessage', async (message) => {
  const response = await axios.post(`${API_URL}/chat`, { message });
  return { sender: 'agent', text: response.data.reply };
});

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [
      { sender: 'agent', text: 'Hello! I am your AI CRM Assistant. How can I help you log an interaction today?' }
    ],
    status: 'idle'
  },
  reducers: {
    addUserMessage: (state, action) => {
      state.messages.push({ sender: 'user', text: action.payload });
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.status = 'idle';
        state.messages.push(action.payload);
      })
      .addCase(sendMessage.rejected, (state) => {
        state.status = 'idle';
        state.messages.push({ sender: 'agent', text: 'Sorry, I encountered an error communicating with the server.' });
      });
  }
});

export const { addUserMessage } = chatSlice.actions;
export default chatSlice.reducer;
