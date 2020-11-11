import React from "react";
import { Button } from "@material-ui/core";

function PrimaryInfo({ nextStep, values }) {
  const {
    username,
    setUsername,
    password,
    setPassword,
    email,
    setEmail,
  } = values;
  return (
    <>
      <h2 className="form__title">Fill fields below</h2>
      <h3 style={{ color: "red" }}>Forms are without validation</h3>
      <input
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        style={styles.input}
        placeholder="Enter your username"
      />
      <input
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        style={styles.input}
        placeholder="Enter your email"
      />
      <input
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        style={styles.input}
        placeholder="Enter your password"
      />
      <div className="buttonContainer">
        <Button variant="contained" color="primary" onClick={nextStep}>
          Next step
        </Button>
      </div>
    </>
  );
}

const styles = {
  input: {
    width: "50ch",
    marginBottom: "30px",
    border: "1px solid lightgray",
    borderRadius: "5px",
    padding: " 10px 15px",
    fontSize: "20px",
    boxSizing: "border-box",
  },
};

export default PrimaryInfo;
