import logo from './logo.svg';
import './App.css';
import HomePage from './header.js';
import Table from './BootstrapTable.js';
import Footer from './footer.js';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      {/* <Table/> */}
      <HomePage/>
      <Footer/>
    </div>
  );
}

export default App;
