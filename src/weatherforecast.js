import React, { useState, useEffect } from 'react';
import axios from 'axios';



const WeatherForecast=({name})=> {
    const [forecast, setForecast] = useState([]);
  
    const fetchWeatherForecast = async () => {
      const API_KEY = 'f556851a92b9041eaef2fcab14203f9e'; 
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${name}&units=metric&appid=${API_KEY}`
        );
        const dailyForecast = extractDailyForecast(response.data.list);
        setForecast(dailyForecast);
      } catch (error) {
        console.error('Error fetching weather forecast:', error);
      }
    };
    useEffect(() => {
      fetchWeatherForecast();
    },[name]);

    const extractDailyForecast = (list) => {
      const dailyForecast = [];
  
      // Get the current date
      const currentDate = new Date();
        currentDate.setHours(15, 0, 0, 0);
  
      // Extract the daily forecast
      list.forEach((item) => {
        const date = new Date(item.dt_txt);
    
          if (date.getHours() === 15 && date.getTime() > currentDate.getTime() && dailyForecast.length < 5) {
          dailyForecast.push(item);
        }
      });
  
      return dailyForecast;
    };
  
    return (
      <div className='bottom-1'>
        {forecast.map((item, index) => (
          <div key={index}>
            <strong><p>Date: {new Date(item.dt_txt).toDateString()}</p></strong>
            <strong><p>Avg. Temperature: {item.main.temp}°C</p></strong>
            <strong><p>{item.weather[0].main}</p></strong>
            <stron><p>Precipitation: {item.clouds.all}%</p></stron>
          </div>
        ))}
      </div>
    );
  }

export default WeatherForecast;
  