import { useState, useEffect } from "react";
import axios from "axios";

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.open-meteo.com/v1/forecast?latitude=${country.capitalInfo.latlng[0]}&longitude=${country.capitalInfo.latlng[1]}&current_weather=true`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, []);

  if (weather)
    return (
      <>
        <h1>{country.name.common}</h1>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
        <h2>Languages:</h2>
        <ul>
          {Object.values(country.languages).map((country) => (
            <li key={country}>{country}</li>
          ))}
        </ul>
        <img src={Object.values(country.flags)[0]}></img>
        <h2>Weather in {country.capital[0]}:</h2>
        <p>Temperature: {weather.current_weather.temperature}</p>
        <p>Wind: {weather.current_weather.windspeed}</p>
      </>
    );

  return (
    <>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h2>Languages:</h2>
      <ul>
        {Object.values(country.languages).map((country) => (
          <li key={country}>{country}</li>
        ))}
      </ul>
      <img src={Object.values(country.flags)[0]}></img>
    </>
  );
};

export default Country;
