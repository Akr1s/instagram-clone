import { Avatar, Button, Input, makeStyles, Modal } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./App.css";
import ImageUpload from "./components/ImageUpload";
import Post from "./components/Post";
import { db, auth } from "./database";
import { Link, Switch, Route, useLocation } from "react-router-dom";
import MultiStepForm from "./components/MultiStepForm/MultiStepForm";
import Profile from "./components/Profile";
import { ACTIONS } from "./contexts/reducer";
import { useData } from "./contexts/StateProvider";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: "5px",
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const [posts, setPosts] = useState([]);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [openSignIn, setOpenSignIn] = useState(false);

  let location = useLocation();

  const [{ user }, dispatch] = useData();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({ type: ACTIONS.SET_USER, user: authUser });
      } else {
        dispatch({ type: ACTIONS.SET_USER, user: null });
      }
    });
  }, []);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
        );
      });
  }, []);

  const clearEmailAndPassword = () => {
    setEmail("");
    setPassword("");
  };

  const handleSignIn = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(alert.message));

    setOpenSignIn(false);
  };

  function handleUploadClose() {
    clearEmailAndPassword();
    setUploadOpen(false);
  }
  return (
    <div className="app">
      <Modal open={uploadOpen} onClose={handleUploadClose}>
        <div style={modalStyle} className={classes.paper}>
          {user ? (
            <ImageUpload
              username={user.displayName}
              closeModal={handleUploadClose}
            />
          ) : (
            <h3>Something goes wrong</h3>
          )}
        </div>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={() => {
          clearEmailAndPassword();
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

      <div className="app__header">
        <Link className="header__routerLink" to="/">
          <img
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
            alt="instagram-logo"
            className="app__headerImage"
          />
        </Link>

        <div className="app__header__rightSidebar">
          {user ? (
            <div className="app__loginContainer">
              <Button
                color="primary"
                variant="contained"
                className="header__firstButton"
                onClick={() => {
                  setUploadOpen(true);
                }}
              >
                Upload photo
              </Button>

              {location.pathname === "/profile" ? null : (
                <>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => {
                      auth.signOut();
                    }}
                  >
                    Logout
                  </Button>
                  <Link className="profileLink" to="/profile">
                    <Avatar>{user.email[0]}</Avatar>
                  </Link>
                </>
              )}
            </div>
          ) : (
            <div className="app__loginContainer">
              {location.pathname === "/" && (
                <>
                  <Button
                    color="primary"
                    variant="contained"
                    className="header__firstButton"
                    onClick={() => {
                      setOpenSignIn(true);
                    }}
                  >
                    Sign in
                  </Button>
                  <Link to="/register" className="routerLink">
                    Sign up
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      <Switch>
        <Route exact path="/">
          <div className="app__posts">
            <div className="app__postsLeft">
              {posts.length ? (
                <>
                  {posts.map(({ id, post }) => (
                    <Post
                      key={id}
                      imgUrl={post.imgUrl}
                      username={post.username}
                      caption={post.caption}
                      postId={id}
                      user={user}
                    />
                  ))}
                </>
              ) : (
                <h2 className="app__noposts">There aren`t posts yet!</h2>
              )}
            </div>
          </div>
        </Route>
        <Route path="/register">
          <MultiStepForm setAppUsername={setUsername} />
        </Route>
        <Route path="/profile">
          {user && <Profile userEmail={user.email} />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
