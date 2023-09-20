import Country from "./Country";

const Countries = ({ countriesToShow, setCountries }) => {
  if (countriesToShow.length > 10)
    return <p>Too many matches, specify another filter</p>;
  if (countriesToShow.length === 1)
    return <Country country={countriesToShow[0]} />;
  return (
    <ul>
      {countriesToShow.map((country) => (
        <li key={country.name.official}>
          {country.name.common}{" "}
          <button
            onClick={() => {
              setCountries([country]);
            }}
          >
            show
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Countries;
