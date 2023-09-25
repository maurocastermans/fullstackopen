const Notification = ({ message }) => {
  const errorStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  const successfulStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  if (message === null) return null;
  if (message.startsWith("Success"))
    return <div style={successfulStyle}> {message}</div>;
  else if (message.startsWith("Error"))
    return <div className="error" style={errorStyle}> {message}</div>;
  else return null;
};

export default Notification;
