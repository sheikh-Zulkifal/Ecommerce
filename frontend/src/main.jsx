import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import 'react-toastify/dist/ReactToastify.css';
import App from './App.jsx';
import store from './Store.jsx';
import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement).render(
  <Provider store={store}>
    <Router>
      <App />
      
    </Router>
  </Provider>
);

