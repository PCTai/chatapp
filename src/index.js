import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter , HashRouter} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import store from './Redux/store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
     <Provider store= {store}>
     <HashRouter>
      {/* <Provider store={store}> */}
      <ToastContainer
        theme='light'
        position="top-right"
        autoClose={2000}
        closeOnClick
        pauseOnHover={false}
      />
      <App />
      {/* </Provider> */}
    </HashRouter>
     </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
