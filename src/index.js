import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './auth/UserContext';
import { BrowserRouter } from 'react-router-dom';
import LearnGuruApi from './api/api';

// call the init metho before rendering the app 
LearnGuruApi.init();

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>

        <App />

      </BrowserRouter>
    </UserProvider>


  </React.StrictMode >,
  document.getElementById('root')
);

reportWebVitals();
