import React from 'react';
import logo from './homepage/images/landlord_solar_logo.png';
import cloud_img from './homepage/images/sky_background.png'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="Clouds">
          <img src={cloud_img}/>
        </div>
        <div className="Logo">
          <img src={logo}/>
        </div>
        <div className="Log-In">
          <button>Sign In</button>
        </div>
        <p>
          Edit <code>src/App.js</code> hello.
        </p>
        <p> My Token = {window.token[1]} </p>
      </header>
    </div>
  );
}

export default App;
