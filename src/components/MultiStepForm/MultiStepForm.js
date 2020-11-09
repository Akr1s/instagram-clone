import React, { useState } from "react";
import Confirm from "./Confirm";
import "./MultiStepForm.css";
import PersonalInfo from "./PersonalInfo";
import PrimaryInfo from "./PrimaryInfo";
import Success from "./Success";

function MultiStepForm({ setAppUsername }) {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");

  const nextStep = () => {
    setStep((step) => step + 1);
  };
  const prevStep = () => {
    setStep((step) => step - 1);
  };
  const clearData = () => {
    setUsername("");
    setPassword("");
    setAge("");
    setEmail("");
    setBio("");
    setLocation("");
  };

  const primaryValues = {
    username,
    setUsername,
    password,
    setPassword,
    email,
    setEmail,
  };
  const personalValues = { age, setAge, bio, setBio, location, setLocation };
  const values = { username, password, age, bio, email, location };
  let formElement;

  switch (step) {
    case 1:
      formElement = <PrimaryInfo nextStep={nextStep} values={primaryValues} />;
      break;
    case 2:
      formElement = (
        <PersonalInfo
          nextStep={nextStep}
          prevStep={prevStep}
          values={personalValues}
        />
      );
      break;
    case 3:
      formElement = (
        <Confirm
          nextStep={nextStep}
          prevStep={prevStep}
          values={values}
          clearData={clearData}
          setAppUsername={setAppUsername}
        />
      );
      break;
    case 4:
      formElement = <Success prevStep={prevStep} />;
      break;
    default:
      formElement = <h1>Unexpected error</h1>;
  }

  return <div className="multiStepForm">{formElement}</div>;
}

export default MultiStepForm;
