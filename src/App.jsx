import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import socketBackEnd from "./filesJS/socketBackEnd";
import { setMessageUser } from "./filesJS/userSubject";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Main from "./components/Main";
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
      <NavBar/>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/main" exact component={Main} />
      </Switch>
    </Router>
  );
}

export default App;
