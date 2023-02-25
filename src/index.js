import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { initializeApp } from "firebase/app";
const firebaseConfig = {
    apiKey: "AIzaSyC1cllBKxZE2nZaprpB_7w9J56VJvxTRcQ",
    authDomain: "cart-17d7e.firebaseapp.com",
    projectId: "cart-17d7e",
    storageBucket: "cart-17d7e.appspot.com",
    messagingSenderId: "492973184487",
    appId: "1:492973184487:web:acb265ae5ae10d8b769942"
  };
  
  // Initialize Firebase
  const app=initializeApp(firebaseConfig);
// ReactDOM.render(<App />, document.getElementById('root'));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
