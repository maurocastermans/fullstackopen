const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

const Header = ({ course }) => <h1>{course}</h1>;

const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part key={part.id} part={part.name} exercises={part.exercises} />
    ))}
  </>
);

const Part = ({ part, exercises }) => (
  <p>
    {part} {exercises}
  </p>
);

const Total = ({ parts }) => {
  const sum = parts.reduce((sum, part) => sum + part.exercises, 0);
  return <p>Number of exercises {sum}</p>;
};

export default Course;
