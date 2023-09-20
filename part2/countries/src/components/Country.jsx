const Country = ({ country }) => {
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
