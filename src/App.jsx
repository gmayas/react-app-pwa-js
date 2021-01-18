import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import socketBackEnd from "./filesJS/socketBackEnd";
import { setMessageUser } from "./filesJS/userSubject";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Main from "./components/Main";
import "./App.css";

function App() {
  
  const [message, setMessage] = useState("");

  useEffect(async () => {
    const socket = await socketBackEnd();
    socket.on("new connection", async (msg) => {
      setMessage(msg);
      await setMessageUser(msg);
    });
  }, []);

  return (
    <Router>
      <NavBar msg={ message }/>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/main" exact component={Main} />
      </Switch>
    </Router>
  );
}

export default App;
