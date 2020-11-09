import { Button, List, ListItem } from "@material-ui/core";
import React from "react";
import { db, auth } from "../../database";
import firebase from "firebase";

function Confirm({ nextStep, prevStep, values, clearData, setAppUsername }) {
  const { username, bio, password, location, email, age } = values;

  const handleConfirm = (event) => {
    event.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        db.collection("users").add({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          username,
          bio,
          password,
          location,
          email,
          age,
        });
        setAppUsername(username);
        nextStep();
        clearData();
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
  };
  return (
    <>
      <h2 className="form__title">Confirm your data</h2>
      <List>
        <ListItem style={styles.listItem}>
          <strong>Name</strong> : {username}
        </ListItem>
        <ListItem style={styles.listItem}>
          <strong>Surname</strong> : {password}
        </ListItem>
        <ListItem style={styles.listItem}>
          <strong>Email</strong> : {email}
        </ListItem>
        <ListItem style={styles.listItem}>
          <strong>Age</strong> : {age}
        </ListItem>
        <ListItem style={styles.listItem}>
          <strong>Bio</strong> : {bio}
        </ListItem>
        <ListItem>
          <strong>Location</strong> : {location}
        </ListItem>
      </List>
      <div className="buttonContainer">
        <Button variant="contained" color="secondary" onClick={prevStep}>
          Prev step
        </Button>
        <Button variant="contained" color="primary" onClick={handleConfirm}>
          Next step
        </Button>
      </div>
    </>
  );
}
const styles = {
  listItem: {
    borderBottom: "1px solid lightgray",
  },
};
export default Confirm;
