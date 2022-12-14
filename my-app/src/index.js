import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import HomePage from './App';
import NavBar from './NavBar';
import TablePage from './BootstrapTable';
import { AppProvider } from './contexts';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppProvider>
    <NavBar/>
     <BrowserRouter>
       <Routes>
        <Route path = "/" element = {<HomePage />} />
        <Route path = "/results" element = {<TablePage />} />
       </Routes>
     </BrowserRouter>
    </AppProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
