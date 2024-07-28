import React, { useState, useEffect } from 'react';
import axios from 'axios';

const metros = ["Delhi", "Mumbai", "Chennai", "Bengaluru", "Kolkata", "Hyderabad"];
const apiKey = 'f556851a92b9041eaef2fcab14203f9e';
const intervalTime = 5 * 60 * 1000; // 5 minutes in milliseconds

const MetroCities = () => {
    const [weatherData, setWeatherData] = useState({});

    const fetchWeatherData = async () => {
        const promises = metros.map(city =>
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
        );
        try {
            const results = await Promise.all(promises);
            const data = results.reduce((acc, result) => {
                acc[result.data.name] = result.data;
                return acc;
            }, {});
            setWeatherData(data);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    useEffect(() => {
        fetchWeatherData();
        const intervalId = setInterval(fetchWeatherData, intervalTime);
        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, []);

    return (
            <div className="top-1">
                {metros.map((city) => (
                <div key={city} className="city-weather">
                    <h2>{city}</h2>
                    {weatherData[city] ? (
                        <div>
                            <p>Temperature: {weatherData[city].main.temp}°C</p>
                            <p>Weather: {weatherData[city].weather[0].main}</p>
                            <p>Humidity: {weatherData[city].main.humidity}%</p>
                            <p>Wind Speed: {(weatherData[city].wind.speed * 3.6).toFixed(2)} KMPH</p>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            ))}

            </div>
    );
}

export default MetroCities;
