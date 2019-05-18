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
import { Chart } from "react-google-charts";


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
        landlord: false,
    };

    this.changePage = this.changePage.bind(this);
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

  changePage() {
    this.setState({landlord: true});
  }

  render() {
    var { isLoaded, data, landlord } = this.state;
    if (landlord) {
      return (
        <div style={{height:"900px"}}>
          <div style={{float: "left", height:"900px", "background": "#E1E1E1", "width": "350px", "opacity": "0.8"}}>
            <div style={{"background": "#2C4CB7", "width": "100%", height:"100px"}}>
              <div style={{"padding-top": "25px", color: "white", "text-align": "center", "font-size": "30px"}}>
                Properties
              </div>
            </div>
            <div class="property-div">
              <button class="tenant-button button5">
                1291 Milvia St
              </button>
            </div>
            <div class="property-div">
              <button class="tenant-button button5">
                2393 Suh Ln
              </button>
            </div>
            <div class="property-div">
              <button class="tenant-button button5">
               3240 Yuh Dr
              </button>
            </div>
            <div class="property-div">
              <button class="tenant-button button5">
                420 Bruh Dr
              </button>
            </div>
          </div>
          <div style={{float: "left", "margin-left": "150px", "margin-top": "30px"}}>
            <div style={{float: "left"}}>
              <div class="stat-title">
                 Last Month's Production
              </div>
              <div class="stat-amount" style={{"color": "#143CDE"}}>
                 4600 kW
              </div>
              <div class="stat-title" style={{"margin-top": "100px", "background": "#1EC360", "width":"300px", "margin-left": "0px"}}>
                 Average Monthly Solar Production
              </div>
              <div class="stat-amount" style={{"color": "#1EC360", "margin-left": "50px"}}>
                 $96.05
              </div>
              <div class="stat-title" style={{"margin-top": "100px", "background": "#D81B06"}}>
                 Monthly Loan Payment
              </div>
              <div class="stat-amount" style={{"color": "#D81B06"}}>
                 $70.00
              </div>
              <div class="stat-title" style={{"margin-top": "100px", "background": "#555555", "opacity": "0.8"}}>
                 Last Month's Bill
              </div>
              <div style={{"margin-top": "20px", "margin-left": "50px"}}>
                <div style={{float: "left", "font-size": "20px"}}>
                  PG&E
                </div>
                <div style={{float: "left", "margin-left": "20px", "font-size": "20px"}}>
                  $45.021
                </div>
                <div style={{float: "left", "margin-left": "20px", "font-size": "20px"}}>
                  Paid
                </div>
              </div>
              <div style={{"margin-left": "50px"}}>
                <button class="tenant-button button4">
                Contact Tenant
                </button>
              </div>
            </div>
            <div style={{float: "left", "margin-left": "100px"}}>
              <div class="stat-title" style={{"margin-left": "200px"}}>
                 System's Production
              </div>
              <div style={{"margin-top": "50px", "margin-left": "100px"}}>
                <Chart
                  width={'500px'}
                  height={'300px'}
                  chartType="Bar"
                  loader={<div>Loading Chart</div>}
                  data={[
                    ['Month', 'Production'],
                    ['01/19', 20],
                    ['02/19', 34],
                    ['03/19', 40],
                    ['04/19', 57],
                    ['05/19', 30],
                  ]}
                  options={{
                    legend: 'none',
                  }}
                  // For tests
                  rootProps={{ 'data-testid': '2' }}
                />
              </div>
              <div class="stat-title" style={{"margin-top": "30px", "margin-left": "200px", "background": "#1EC360"}}>
                 Cumulative Profit
              </div>
              <div>
                <Chart
                  width={'700px'}
                  height={'400px'}
                  chartType="LineChart"
                  loader={<div>Loading Chart</div>}
                  data={[
                    ['Date','Profit'],
                    ['2014', 0],
                    ['2015', 10],
                    ['2016', 20],
                    ['2017', 30],
                    ['2018', 40],
                    ['2019', 50],
                  ]}
                  options={{
                    legend: 'none',
                    colors: ['#1EC360']
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )
    } else {
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
                    <button class="btn" onClick={this.changePage}>Sign In</button>
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
}

export default App;
