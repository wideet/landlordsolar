import React from 'react';
import logo from './homepage/images/landlord_solar_logo.png';
import cloud_img from './homepage/images/sky_background.png';
import placeholder from './homepage/images/flowdiagram.PNG';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div id="banner">
          <div id="clouds_and_words">
            <div className="Clouds">
              <img src={cloud_img}/>
                <div className="General-Desc">
                  <br/>Your rentals go solar 
                  <br/> You make money
                  <br/>We make it easy       
                </div>
                  <button class="btn">Sign In</button>  
                <div ClassName="Calculate">
                  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                  <form class="example" action="estimates-page">
                    <input type="text" placeholder="Address" name="search"></input>
                    <button type="submit"><i class="fa fa-search"></i></button>
                  </form>
                </div>
              </div>
          </div>
          <div className="Logo">
            <img src={logo}/>
          </div>
          <div className="p1">
            <img src={placeholder}/>
          </div>
          <div className="p2">
            <img src={placeholder}/>
          </div>
          <div className="p3">
            <img src={placeholder}/>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
