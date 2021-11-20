import React from "react";
import { Route } from "react-router-dom";
import Contest from "./components/Contest";
import Login from "./components/Login";
import Navigation from "./components/Navigation";
import Ranking from "./components/Ranking";
import Register from "./components/Register";

function App() {
  return (
    <>
      <Route path="/contest" exact={true} component={Contest} />
      <Route path="/home" component={Ranking} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Navigation />
    </>
  );
}

export default App;
