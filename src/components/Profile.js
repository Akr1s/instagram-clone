import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useData } from "../contexts/StateProvider";
import { db } from "../database";
import "./Profile.css";

function Profile() {
  const [loading, setLoading] = useState(true);

  const [userData, setUserData] = useState({});
  const history = useHistory();

  const [{ user }] = useData();
  if (!user) {
    history.push("/");
  }

  useEffect(() => {
    const getUserData = async (email) => {
      if (!email) return;
      db.collection("users")
        .where("email", "==", email)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            setUserData(doc.data());
          });
          setLoading(false);
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        });
    };

    getUserData(user?.email);
  }, []);

  if (loading) {
    return (
      <div className="profile">
        <h1 style={{ margin: "auto" }}>Loading...</h1>
      </div>
    );
  }
  const { username, bio, location, age } = userData;
  return (
    <div className="profile">
      <div className="card">
        <div className="card__header">
          <Avatar className="card__avatar">{username[0]}</Avatar>
          <div className="card__headerAside">
            <p className="card__username">{username}</p>
            <p className="card__bio">Status: {bio}</p>
          </div>
        </div>
        <div className="card__info">
          <p className="card__age">{age} years</p>
          <p className="location">{location}</p>
        </div>
        <Link to="/" className="routerLink">
          Return to homepage
        </Link>
      </div>
    </div>
  );
}

export default Profile;
