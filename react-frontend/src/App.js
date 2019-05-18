import React, { Component } from 'react';
import logo from './homepage/images/landlord_solar_logo.png';
import cloud_img from './homepage/images/sky_background.png';
import placeholder from './homepage/images/flowdiagram.PNG';
import first from './homepage/images/first.PNG'
import then from './homepage/images/then.PNG'
import finaly from './homepage/images/finally2.PNG'
import box1 from './homepage/images/box1_sunpower.PNG'
import box2 from './homepage/images/box2_vivint.PNG'
import box3 from './homepage/images/box3_petersendean.PNG'
import installation from './homepage/images/installation.PNG'


import './App.css';

//const getData = () => {
//    return axios
//    .get('http://localhost:5000/dashboard_data', {
//        headers: {"Content-type" : "application/json"}
//    })
//}


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
        data: null,
        isLoaded: false,
    }
  }

  componentDidMount() {
    fetch('/api/dashboard_data')
    .then(response => response.json())
    .then(json => {
        this.setState({
            isLoaded: true,
            data: json
        })
    });
  }

  render() {
    var { isLoaded, data } = this.state;
    return (
    <div className="App">
      <header className="App-header">
        <div id="banner">
          <div id="clouds_and_words">
            <div className="Clouds">
              <img src={cloud_img}/>
                <div className="General-Desc">
                  <br/>Your Rentals Go Solar 
                  <br/> You Make Money
                  <br/>We Make It Easy       
                </div>
                  <button class="btn">Sign In</button>
                <div ClassName="Calculate">
                  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                  <form class="example" action="estimates-page">
                    <input type="text" placeholder="Address" name="search"></input>
                    <button type="submit"><i class="search"></i>Calculate Savings</button>
                  </form>
                </div>
              </div>
          </div>
          <div className="Logo">
            <img src={logo}/>
          </div>
          <div className="p1">
            <img src={first}/>
          </div>
          <div className="b1">
            <img src={box1}/>
          </div>
          <div className="b2">
            <img src={box2}/>
          </div>
          <div className="b3">
            <img src={box3}/>
          </div>
          <div className="p2">
            <img src={then}/>
          </div>
          <div className="in">
            <img src={installation}/>
          </div>
          <div className="p3">
            <img src={finaly}/>
          </div>
          <div className="p4">
            <img src={placeholder}/>
          </div>
        </div>
      </header>
    </div>
        );
    }
}

export default App;
