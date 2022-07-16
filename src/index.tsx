import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import StockContextProvider from './components/store/stock-contex';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StockContextProvider>
    <App />
  </StockContextProvider>
);
reportWebVitals();
