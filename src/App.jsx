import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MapView from "./components/MapView";
import NavBar from "./components/NavBar";
import "./App.css";

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/">
          <MapView />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
