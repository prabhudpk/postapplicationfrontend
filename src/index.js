import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import Header from "./componenets/Header";
// import "./App.css";
import Login from "./componenets/Login";
import Register from "./componenets/Register";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Header />
    <Routes>
      
      <Route exact path="/login" Component={Login} />
      <Route exact path="/register" Component={Register} />
      {/* <Route path="*" element={<h1>404</h1>} /> */}
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
