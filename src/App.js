import React, { useEffect, useState } from 'react';
import Weather from './weather';


const LocationComponent = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [city, setCity] = useState('');


  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          setLatitude(latitude);
          setLongitude(longitude);

          try {
            const openCageApiKey = 'f247068003904cdc85a50dc1a6830f53';
            const openCageApiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${openCageApiKey}`;

            const openCageResponse = await fetch(openCageApiUrl);
            const openCageData = await openCageResponse.json();

            if (openCageData.results && openCageData.results.length > 0) {
              const city = openCageData.results[0].components.city;
              setCity(city);
            } else {
              setCity('City not found');
            }
          } catch (error) {
            console.error('Error retrieving location:', error);
            setCity('Error retrieving location');
          }
        },
        (error) => {
          console.error('Error getting geolocation:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
    console.log(latitude, longitude);
  }, );

  return (
    <div>
      <Weather city={city}/>
    </div>
  );
};


export default LocationComponent;
