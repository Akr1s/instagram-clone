import React from "react";
import { Link } from "react-router-dom";

function Success() {
  return (
    <>
      <h1 className="form__title">Congratulations, you did it!</h1>

      <Link className="routerLink" to="/">
        Go to homepage
      </Link>
    </>
  );
}

export default Success;
