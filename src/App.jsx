import React, { useEffect } from "react";
import "./App.css";
import { auth } from "./database";
import { Switch, Route } from "react-router-dom";
import MultiStepForm from "./components/MultiStepForm/MultiStepForm";
import Profile from "./components/Profile";
import { ACTIONS } from "./contexts/reducer";
import { useData } from "./contexts/StateProvider";
import PostsList from "./components/PostsList";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  const [_, dispatch] = useData();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({ type: ACTIONS.SET_USER, user: authUser });
      } else {
        dispatch({ type: ACTIONS.SET_USER, user: null });
      }
    });
  }, []);

  return (
    <div className="app">
      <Switch>
        <Route exact path="/">
          <Header />
          <PostsList />
        </Route>
        <Route path="/register">
          <MultiStepForm />
        </Route>
        <Route path="/profile">
          <Header />
          <Profile />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
