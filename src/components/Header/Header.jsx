import { Avatar, Button } from "@material-ui/core";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useData } from "../../contexts/StateProvider";
import SignIn from "../Modals/SignIn";
import UploadImage from "../Modals/UploadImage";
import { auth } from "../../database";
import InstLogo from '../../inst-logo.png'

function Header() {
  const [uploadOpen, setUploadOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);

  const [{ user }] = useData();
  let location = useLocation();

  return (
    <>
      <SignIn openSignIn={openSignIn} setOpenSignIn={setOpenSignIn} />
      <UploadImage uploadOpen={uploadOpen} setUploadOpen={setUploadOpen} />
      <header className="app__header">
        <Link className="header__routerLink" to="/">
          <img
            src={InstLogo}
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

              <Button
                color="primary"
                variant="contained"
                onClick={() => {
                  auth.signOut();
                }}
              >
                Logout
              </Button>
              {location.pathname === "/profile" ? null : (
                <Link className="profileLink" to="/profile">
                  <Avatar>{user.displayName[0]}</Avatar>
                </Link>
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
      </header>
    </>
  );
}

export default Header;
