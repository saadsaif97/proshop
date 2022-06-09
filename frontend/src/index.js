import './bootstrap.min.css';
import './index.css';
import './all.min.css'

import App from './App';
import { Provider } from "react-redux";
import React from 'react';
import ReactDOM from 'react-dom/client';
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);