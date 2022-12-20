import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js'
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyByykDjtI_Am-cdWFcjYM8vDWp1sSg2-g4",
  authDomain: "acic-helper.firebaseapp.com",
  projectId: "acic-helper",
  storageBucket: "acic-helper.appspot.com",
  messagingSenderId: "688448411801",
  appId: "1:688448411801:web:8b70e0d025f49ed9b0c008"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
