import { configureStore } from '@reduxjs/toolkit'
import dataSlice from './dataSlice'; // dataSlice import
import tipSlice from './tipSlice'; // dataSlice import

export default configureStore({
  reducer: { 
    data: dataSlice.reducer,
    tip: tipSlice.reducer,
  }
});