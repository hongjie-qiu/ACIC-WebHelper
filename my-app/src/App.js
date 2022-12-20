import './App.css';
import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import HomePage from './header.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignInPage from './SignInPage';
import { AppProvider } from './contexts';
import NavBar from './NavBar';
import TablePage from './BootstrapTable';


function App() {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const auth = getAuth();

    //addEventListener("loginEvent", () => {})
    const unregisterAuthListener = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setCurrentUser(firebaseUser);
      } else {
        setCurrentUser(null);
      }
    });

    return () => {
      //cleanup
      unregisterAuthListener();
    };
  }, []);

  if (currentUser) {
    return (
      <React.StrictMode>
        <AppProvider>
          <NavBar auth={getAuth()} />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/results" element={<TablePage />} />
            </Routes>
          </BrowserRouter>
        </AppProvider>
      </React.StrictMode>
    );
  } else {
    return <SignInPage />;
  }
}

export default App;
