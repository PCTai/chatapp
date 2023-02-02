import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {  HashRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import store from './Redux/store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <HashRouter>
      <ToastContainer
        theme='light'
        position="top-right"
        autoClose={2000}
        closeOnClick
        pauseOnHover={false}
      />
      <App />
    </HashRouter>
  </Provider>
  // </React.StrictMode>
);

reportWebVitals();
