import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// fetchData thunk 생성
export const lolData = createAsyncThunk(
  'data/lolData',
  async () => {
    try {
      const response = await axios.get('/test');
      console.log('서버에서 받은 데이터:', response.data); // 로깅 추가
      return response.data; // 받은 데이터를 반환
    } catch (error) {
      throw error;
    }
  }
);

// dataSlice 생성
const dataSlice = createSlice({
  name: 'data',
  initialState: {
    champions: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(lolData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(lolData.fulfilled, (state, action) => {
        state.loading = false;
        state.champions = [...action.payload]
          console.log("fulfilled 확인:", action.payload);
      
      })
      .addCase(lolData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default dataSlice;