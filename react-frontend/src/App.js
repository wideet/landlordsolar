import React from 'react';
import logo from './homepage/images/landlord_solar_logo.png';
import cloud_img from './homepage/images/sky_background.png'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div id="banner">
          <div id="clouds_and_words">
            <div className="Clouds">
               <img src={cloud_img}/>
               <button class="btn">Sign In</button>
            </div>
            <div className="General-Desc">
              <br/>Your rentals go solar 
              <br/> You make money
              <br/>We make it easy         
            </div>
          </div>
          <div className="Logo">
            <img src={logo}/>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
