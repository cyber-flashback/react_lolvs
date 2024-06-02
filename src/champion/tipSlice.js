import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// fetchData thunk 생성

// 현재 페이지를 업데이트하는 액션


export const tipData = createAsyncThunk(
    'tip/tipData',
    async (currentpage) => {
      try {
        const response = await axios.get('/selecttip', {params:{
          currentpage : currentpage
        }});
        console.log('글내용:', response.data); // 로깅 추가
        return response.data; // 받은 데이터를 반환
      } catch (error) {
        throw error;
      }
    },
  );
  
  // dataSlice 생성
  const tipSlice = createSlice({
    name: 'data',
    initialState: {
      tips: [],
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(tipData.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(tipData.fulfilled, (state, action) => {
          state.loading = false;
          state.tips = [...action.payload]

        })
        .addCase(tipData.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
  });


export default tipSlice