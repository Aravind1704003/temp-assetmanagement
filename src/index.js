import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import NewAddProduct from './Component/NewAddProduct'




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode> 
    <NewAddProduct />
  </React.StrictMode>
);


reportWebVitals();
