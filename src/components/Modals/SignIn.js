import { Button, Input, Modal } from "@material-ui/core";
import React, { useState } from "react";
import { auth } from "../../database";
import { useStyles, getModalStyle } from "./styles";

function SignIn({ openSignIn, setOpenSignIn }) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const clearEmailAndPassword = () => {
    setEmail("");
    setPassword("");
  };

  const handleSignIn = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then(clearEmailAndPassword)
      .catch((error) => alert(alert.message));

    setOpenSignIn(false);
  };

  return (
    <Modal
      open={openSignIn}
      onClose={() => {
        setOpenSignIn(false);
      }}
    >
      <div style={modalStyle} className={classes.paper}>
        <form className="app_signUp">
          <center>
            <img
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt="instagram-logo"
              className="app__headerImage"
            />
            <h2>Sign In</h2>
          </center>
          <Input
            placeholder="email"
            type="text"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <Input
            placeholder="password"
            type="text"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSignIn}
            type="submit"
          >
            Sign In
          </Button>
        </form>
      </div>
    </Modal>
  );
}

export default SignIn;
