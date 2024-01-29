import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';


import 'react-toastify/dist/ReactToastify.css';
import App from './App.jsx';
import store from './Store.jsx';

const rootElement = document.getElementById('root');

createRoot(rootElement).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
