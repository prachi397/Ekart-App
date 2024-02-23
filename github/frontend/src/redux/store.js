import { configureStore } from '@reduxjs/toolkit';
import EkartReducer from './ekart/EkartReducer';

const store = configureStore({

    reducer: {
          LoginData: EkartReducer

    }

})

export default store;