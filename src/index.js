import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {ApiProvider } from '@reduxjs/toolkit/query/react'
import { apiSlice } from './features/api/apiSlice';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../src/features/User/Index'
import otpReducer from '../src/features/User/Otp'

const store = configureStore({
  reducer: {
    user: userReducer,
    otp:otpReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})



ReactDOM.render(
  <React.StrictMode>
     <BrowserRouter>
     <Provider store={store} api={apiSlice}>
      {/* <ApiProvider store={store} api={apiSlice}> */}
       <App />
     {/* </ApiProvider> */}

     </Provider>
     
    
     </BrowserRouter>
    
  </React.StrictMode>,
  document.getElementById('root')
);
