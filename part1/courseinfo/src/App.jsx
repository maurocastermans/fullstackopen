const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <>
      <Header course={course} />
      <Content
        parts={[part1, part2, part3]}
        exercises={[exercises1, exercises2, exercises3]}
      />
      <Total total={exercises1 + exercises2 + exercises3} />
    </>
  );
};

const Header = ({ course }) => <h1>{course}</h1>;

const Content = ({ parts, exercises }) => (
  <>
    <Part part={parts[0]} exercises={exercises[0]} />
    <Part part={parts[1]} exercises={exercises[1]} />
    <Part part={parts[2]} exercises={exercises[2]} />
  </>
);

const Part = ({ part, exercises }) => (
  <p>
    {part} {exercises}
  </p>
);

const Total = ({ total }) => <p>Number of exercises {total}</p>;

export default App;
