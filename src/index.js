// import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Header from './Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GoogleOAuthProvider } from "@react-oauth/google";
import Admin from './Admin';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="11697718537-dqjd46buavim9ufcdipmvpfe3ksvt5lk.apps.googleusercontent.com">
    <Router>
      <Routes>
        <Route path='/' element={<Header />} />
        <Route path='/admin' element={<Admin />} />
      </Routes>
    </Router>
  </GoogleOAuthProvider>
)

reportWebVitals();
