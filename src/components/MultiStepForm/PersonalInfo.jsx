import { Button } from "@material-ui/core";
import React from "react";

function PersonalInfo({ nextStep, prevStep, values }) {
  const { age, setAge, bio, setBio, location, setLocation } = values;
  return (
    <>
      <h2 className="form__title">Fill fields below</h2>
      <input
        value={age}
        onChange={(event) => setAge(event.target.value)}
        style={styles.input}
        placeholder="Enter your age"
      />
      <input
        value={bio}
        onChange={(event) => setBio(event.target.value)}
        style={styles.input}
        placeholder="Enter your short bio"
      />
      <input
        value={location}
        onChange={(event) => setLocation(event.target.value)}
        style={styles.input}
        placeholder="Enter your country name"
      />
      <div className="buttonContainer">
        <Button variant="contained" color="secondary" onClick={prevStep}>
          Prev step
        </Button>
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

export default PersonalInfo;
