import React, { useState } from 'react'
import axios from 'axios'
import Forecast from './weatherforecast'
import MetroCities from './metrocities';



const App = ({city})=> {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [tempe, setTempe] = useState(null);
  const [unit, setUnit] = useState('fahrenheit'); 
  
  // const API_KEY = process.env.OPENWEATHERMAPKEY
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=f556851a92b9041eaef2fcab14203f9e`
  
  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log('Here is the : ' , response.data)
        setTempe(response.data.main.temp);
      })
      setLocation('')
    }
  }

  const changeTemp = (event) => {
    const val = event.target.value;
    if (val === 'fahrenheit') {
      setTempe(data.main.temp);
      setUnit('fahrenheit')
    } else if (val === 'celsius') {
      setTempe(((data.main.temp - 32) * 5) / 9);
      setUnit('celsius')
    } else if (val === 'kelvin') {
      setTempe((((data.main.temp - 32) * 5) / 9) + 273.15);
      setUnit('kelvin')
    }
  };

  const displayTemp = () => {
    if (tempe === null || data.main === undefined) return null;
    let tempDisplay;
    if (unit === 'fahrenheit') {
      tempDisplay = `${tempe.toFixed(2)}°F`;
    } else if (unit === 'celsius') {
      tempDisplay = `${tempe.toFixed(2)}°C`;
    } else if (unit === 'kelvin') {
      tempDisplay = `${tempe.toFixed(2)}K`;
    }
    return <h1>{tempDisplay}</h1>;
  };

  return (
    <div className="app">
      <center><h1>Weather Monitoring</h1></center> 
      <center><h3>Your current loaction : {city}</h3></center>
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location to get detailed info ... '
          type="text" />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="tempUnit">
          <label for="tempUnits">In which unit do you prefer your temperature : </label>
            <select name="Unit" id="unit" onChange={changeTemp}>
              <option value="fahrenheit">fahrenheit</option>
              <option value="celsius">celsius</option>
              <option value="kelvin">kelvin</option>
            </select>
          </div>
          <div className="temp">
            {displayTemp()}          
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        <div className="top-1">
      <MetroCities />
        </div>
        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{(((data.main.feels_like-32)*5) / 9 ).toFixed()}°C</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{(1.609*(data.wind.speed)).toFixed(2)} KMPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }
      </div>
      <Forecast name={data.name} />
    </div>
  );
}


export default App;