import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {Provider} from "react-redux";
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducer/index.jsx'
 const store=configureStore({
  reducer:rootReducer,
 });
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
     <BrowserRouter>
    <App />
  </BrowserRouter>,
  </Provider>
  
)
