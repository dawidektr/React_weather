import React, { Component } from 'react';
import Form from './Form';
import './App.css';
import Result from './Result';
const APIKey = '6762b736603d3339adb2cfeed715cdab'

//Klucz do API

class App extends Component {

  state = {
    value: '',
    date: '',
    city: '',
    sunrise: '',
    sunset: '',
    temp: '',
    pressure: '',
    wind: '',
    err: false
  }
  handleInputChange = (e) => {
    this.setState({
      value: e.target.value
    })


  }
  handleCitySubmit = e =>
  {
    e.preventDefault()
    const API = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&APPID=${APIKey}&units=metric`;
    
    fetch(API)
    .then(response => {
      if(response.ok)
      {
        return response
      }
      throw Error("Nie udało się")
    })
    .then(response =>response.json() )
    .then(data => {
      const time = new Date().toLocaleDateString()
      this.setState(prevState => ({
      err: false,
      date: time,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
      temp: data.main.temp,
      pressure: data.main.pressure,
      wind: data.wind.speed,
      city: prevState.value,
      
      }))



    })
    
    .catch(err =>
    {
      console.log(err);
      this.setState(state =>({
        
        err: true,
        city: state.value

      }))
    
    
    })

  }


  render() {
    return (
      <div className="App">
        <Form value={this.state.value}
        change = {this.handleInputChange}
        submit = {this.handleCitySubmit}/>
        <Result weather={this.state}
        />

       
      </div>
    );
  }
}

export default App;
