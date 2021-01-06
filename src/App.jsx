import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import socketBackEnd from "./filesJS/socketBackEnd";
import { login, setMessageUser } from "./filesJS/userSubject";
import MapView from "./components/MapView";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import "./App.css";


function App() {
  useEffect(async () => {
    const socket = await socketBackEnd();
    socket.on("new connection", async (res) => {
      await setMessageUser(res);
    });
  }, []);

  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/map" exact component={MapView} />
      </Switch>
    </Router>
  );
}

export default App;
