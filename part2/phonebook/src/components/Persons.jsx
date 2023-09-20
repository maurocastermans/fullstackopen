import Person from "./Person";

const Persons = ({ personsToShow }) => (
  <ul>
    {personsToShow.map((person) => (
      <Person key={person.name} person={person} />
    ))}
  </ul>
);

export default Persons;
