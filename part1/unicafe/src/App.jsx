import { useState } from "react";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const incrementGood = () => {
    setGood(good + 1);
  };

  const incrementNeutral = () => {
    setNeutral(neutral + 1);
  };

  const incrementBad = () => {
    setBad(bad + 1);
  };

  return (
    <>
      <h1>Give feedback</h1>
      <Button text={"good"} handleClick={incrementGood} />
      <Button text={"neutral"} handleClick={incrementNeutral} />
      <Button text={"bad"} handleClick={incrementBad} />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good + bad * -1) / total;
  const percentage_positive = (good / total) * 100;

  if (total === 0) {
    return <p>No feedback given</p>;
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={`${percentage_positive} %`} />
      </tbody>
    </table>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

export default App;
