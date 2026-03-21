import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const fetchInteractions = createAsyncThunk('interactions/fetchAll', async () => {
  const response = await axios.get(`${API_URL}/interactions`);
  return response.data;
});

export const logInteraction = createAsyncThunk('interactions/log', async (data) => {
  const response = await axios.post(`${API_URL}/log-interaction`, data);
  return response.data;
});

const interactionSlice = createSlice({
  name: 'interactions',
  initialState: {
    data: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInteractions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchInteractions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchInteractions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(logInteraction.fulfilled, (state, action) => {
        state.data.push(action.payload);
      });
  }
});

export default interactionSlice.reducer;
