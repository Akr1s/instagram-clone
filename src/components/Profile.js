import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../database";
import "./Profile.css";

function Profile({ userEmail }) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const getUserData = async (email) => {
    db.collection("users")
      .where("email", "==", email)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          setUser(doc.data());
        });
        setLoading(false);
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  };
  useEffect(() => {
    getUserData(userEmail);
  }, [userEmail]);

  if (loading) {
    return (
      <div className="profile">
        <h1 style={{ margin: "auto" }}>Loading...</h1>
      </div>
    );
  }
  const { username, bio, location, age } = user;
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
