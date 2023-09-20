const PersonForm = ({
  addPerson,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => (
  <form onSubmit={addPerson}>
    name: <input value={newName} onChange={handleNameChange} /> <br />
    number: <input value={newNumber} onChange={handleNumberChange} /> <br />
    <button type="submit">add</button>
  </form>
);

export default PersonForm;
