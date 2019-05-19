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
import banner_img from './homepage/images/banner.png'
import box0 from './homepage/images/newimg.PNG'
import box7 from './homepage/images/box1_sunrun.PNG'


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
        propertyId: "",
        productionData: null,
        cumProfit: null,
    };

    this.changePage = this.changePage.bind(this);
    this.quote = this.quote.bind(this);

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

  quote() {
    this.setState({quote: true});
  }

  changeProperty(propertyId, buttonId) {
    this.setState({propertyId: propertyId});
    for (let i = 1; i < 3; i++) {
      let id = 'button' + i;
      document.getElementById(id).className = "tenant-button button5";
    }
    document.getElementById(buttonId).className = "tenant-button button-select";
    if (buttonId === 'button1') {
      this.changeSystemProduction();
      this.changeCumProfit();
      document.getElementById('lmp').innerHTML = '700 kWh';
      document.getElementById('amsp').innerHTML = '$115.23';
      document.getElementById('mlp').innerHTML = '$80.00';
      document.getElementById('lmb').innerHTML = '$43.15';
      document.getElementById('lmbs').innerHTML = 'Overdue';
    } else {
      this.changeSystemProduction1();
      this.changeCumProfit1();
      document.getElementById('lmp').innerHTML = '625 kWh';
      document.getElementById('amsp').innerHTML = '$90.98';
      document.getElementById('mlp').innerHTML = '$75.00';
      document.getElementById('lmb').innerHTML = '$24.10';
      document.getElementById('lmbs').innerHTML = 'Paid';
    }
  }

  changeSystemProduction() {
    const data = [['Month', 'kWh'], ['01/19', 340], ['02/19', 530], ['03/19', 400], ['04/19', 570], ['05/19', 700]];
    this.setState({productionData: data})
  }

  changeSystemProduction1() {
    const data = [['Month', 'kWh'], ['01/19', 320], ['02/19', 430], ['03/19', 407], ['04/19', 540], ['05/19', 625]];
    this.setState({productionData: data})
  }

  changeCumProfit() {
    let data = [
      ['Date','Profit'],
      ['2014', 5000],
      ['2015', 5100],
      ['2016', 5300],
      ['2017', 5400],
      ['2018', 5700],
      ['2019', 5800],
    ];
    this.setState({cumProfit: data})
  }

  changeCumProfit1() {
    let data = [
      ['Date','Profit'],
      ['2014', 4500],
      ['2015', 4600],
      ['2016', 4800],
      ['2017', 4900],
      ['2018', 5000],
      ['2019', 5400],
    ];
    this.setState({cumProfit: data})
  }

  render() {
    var { isLoaded, data, landlord, propertyId, productionData, cumProfit, quote } = this.state;
    if (landlord) {
      if (propertyId === '') {
        return (
          <div>
          <div style={{position:'relative', width:'2000px', 'height': '60px', background:'#1D3D70'}}>
          </div>
          <div className="Logo">
            <img src={logo}/>
          </div>
          <div style={{height:"900px"}}>
            <div style={{float: "left", height:"900px", "background": "#E1E1E1", "width": "350px"}}>
              <div style={{"background": "#086E9A", "width": "100%", height:"100px"}}>
                <div style={{"padding-top": "25px", color: "white", "text-align": "center", "font-size": "30px"}}>
                  Properties
                </div>
              </div>
              <div class="property-div">
                <button id='button1' class="tenant-button button5" onClick={() => this.changeProperty('1234', 'button1')}>
                  1291 Milvia St.
                </button>
              </div>
              <div class="property-div">
                <button id='button2' class="tenant-button button5" onClick={() => this.changeProperty('1234', 'button2')}>
                  2393 Sun Ln.
                </button>
              </div>
            </div>
            <div style={{float: "left", "margin-left": "150px", "margin-top": "30px", "display":"none"}}>
              <div style={{float: "left"}}>
                <div class="stat-title">
                   Last Month's Output
                </div>
                <div id='lmp' class="stat-amount" style={{"color": "#143CDE"}}>
                </div>
                <div class="stat-title" style={{"margin-top": "100px", "background": "#1EC360", "width":"300px", "margin-left": "0px"}}>
                   Average Monthly Solar Output
                </div>
                <div id='amsp' class="stat-amount" style={{"color": "#1EC360", "margin-left": "50px"}}>
                </div>
                <div class="stat-title" style={{"margin-top": "100px", "background": "#D81B06"}}>
                   Monthly Loan Payment
                </div>
                <div id='mlp' class="stat-amount" style={{"color": "#D81B06"}}>
                </div>
                <div class="stat-title" style={{"margin-top": "100px", "background": "#555555", "opacity": "0.8"}}>
                   Last Month's Bill
                </div>
                <div style={{"margin-top": "20px", "margin-left": "50px"}}>
                  <div style={{float: "left", "font-size": "20px"}}>
                    PG&E
                  </div>
                  <div id='lmb' style={{float: "left", "margin-left": "20px", "font-size": "20px"}}>
                  </div>
                  <div id='lmbs' style={{float: "left", "margin-left": "20px", "font-size": "20px"}}>
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
                   System's Output
                </div>
                <div style={{"margin-top": "50px", "margin-left": "100px"}}>
                  <Chart
                    width={'500px'}
                    height={'300px'}
                    chartType="Bar"
                    loader={<div>Loading Chart</div>}
                    data={productionData}
                    options={{
                      legend: 'none',
                      vAxis: {
                        title: 'kWh',
                      },
                    }}
                    // For tests
                    rootProps={{ 'data-testid': '2' }}
                  />
                </div>
                <div class="stat-title" style={{"margin-top": "30px", "margin-left": "200px", "background": "#1EC360"}}>
                   Cumulative Production
                </div>
                <div>
                  <Chart
                    width={'700px'}
                    height={'400px'}
                    chartType="LineChart"
                    loader={<div>Loading Chart</div>}
                    data={cumProfit}
                    options={{
                      legend: 'none',
                      colors: ['#1EC360'],
                      vAxis: {
                        title: 'Dollars',
                        viewWindow: {
                          min: 3000,
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          </div>
        )
      } else {
        return (
          <div>
          <div style={{position:'relative', width:'2000px', 'height': '60px', background:'#1D3D70'}}>
          </div>
          <div className="Logo">
            <img src={logo}/>
          </div>
          <div style={{height:"900px"}}>
            <div style={{float: "left", height:"900px", "background": "#E1E1E1", "width": "350px"}}>
              <div style={{"background": "#086E9A", "width": "100%", height:"100px"}}>
                <div style={{"padding-top": "25px", color: "white", "text-align": "center", "font-size": "30px"}}>
                  Properties
                </div>
              </div>
              <div class="property-div">
                <button id='button1' class="tenant-button button5" onClick={() => this.changeProperty('1234', 'button1')}>
                  1291 Milvia St.
                </button>
              </div>
              <div class="property-div">
                <button id='button2' class="tenant-button button5" onClick={() => this.changeProperty('1234', 'button2')}>
                  2393 Sun Ln.
                </button>
              </div>
            </div>
            <div style={{float: "left", "margin-left": "150px", "margin-top": "30px"}}>
              <div style={{float: "left"}}>
                <div class="stat-title">
                   Last Month's Output
                </div>
                <div id='lmp' class="stat-amount" style={{"color": "#143CDE"}}>
                </div>
                <div class="stat-title" style={{"margin-top": "100px", "background": "#1EC360", "width":"300px", "margin-left": "0px"}}>
                   Average Monthly Solar Production
                </div>
                <div id='amsp' class="stat-amount" style={{"color": "#1EC360", "margin-left": "50px"}}>
                </div>
                <div class="stat-title" style={{"margin-top": "100px", "background": "#D81B06"}}>
                   Monthly Loan Payment
                </div>
                <div id='mlp' class="stat-amount" style={{"color": "#D81B06"}}>
                </div>
                <div class="stat-title" style={{"margin-top": "100px", "background": "#555555", "opacity": "0.8"}}>
                   Last Month's Bill
                </div>
                <div style={{"margin-top": "20px", "margin-left": "50px"}}>
                  <div style={{float: "left", "font-size": "20px"}}>
                    PG&E
                  </div>
                  <div id='lmb' style={{float: "left", "margin-left": "20px", "font-size": "20px"}}>
                  </div>
                  <div id='lmbs' style={{float: "left", "margin-left": "20px", "font-size": "20px"}}>
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
                   System's Output
                </div>
                <div style={{"margin-top": "50px", "margin-left": "100px"}}>
                  <Chart
                    width={'500px'}
                    height={'300px'}
                    chartType="Bar"
                    loader={<div>Loading Chart</div>}
                    data={productionData}
                    options={{
                      legend: 'none',
                      vAxis: {
                        title: 'kWh',
                      }
                    }}
                    // For tests
                    rootProps={{ 'data-testid': '2' }}
                  />
                </div>
                <div class="stat-title" style={{"margin-top": "30px", "margin-left": "200px", "background": "#1EC360"}}>
                   Cumulative Production
                </div>
                <div>
                  <Chart
                    width={'700px'}
                    height={'400px'}
                    chartType="LineChart"
                    loader={<div>Loading Chart</div>}
                    data={cumProfit}
                    options={{
                      legend: 'none',
                      colors: ['#1EC360'],
                      vAxis: {
                        title: 'Dollars',
                        viewWindow: {
                          min: 3000,
                        },
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          </div>
      );
    }
    } else if (quote) {
    return (
      <div className="App">
          <div style={{position:'relative', width:'2000px', 'height': '60px', background:'#1D3D70'}}>
          </div>
          <div className="Logo">
            <img src={logo}/>
          </div>
          <div id="banner">
            <div className="b1">
              <img src={box7}/>
            </div>
            <div className="b2">
              <img src={box2}/>
            </div>
            <div className="b3">
              <img src={box3}/>
            </div>
          </div>
      </div>
        );
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
                  <div>
                    <button class="btn" onClick={this.changePage}>Sign In</button>
                  </div>
                  <div ClassName="Calculate">
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                    <form class="example" action="estimates-page">
                      <input type="text" placeholder="Address" name="search"></input>
                      <button class="search"  onClick={this.quote}>Calculate Savings</button>
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
            <div className="b0">
              <img src={box0}/>
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
