import React, { useEffect, useState, useRef } from "react";
import socketBackEnd from "../filesJS/socketBackEnd";
import { login, logout } from "../filesJS/userSubject";

const Login = (props) => {
  const userInput = useRef(null);
  // Se define el estado de los usuarios en este componente
  const [newUser, setNewUser] = useState("");
  // Se definen las tareas
  const [users, setUsers] = useState([]);

  useEffect( async() => {
      setNewUser("");
      setUsers([]);
      console.log('Si pasa...')
      await logout();
  }, []);

  // Control de summit y eventos de las paginas HTLM de tipo Form
  const handleSummit = async (e) => {
    e.preventDefault(); // Evita que se refresque la pantalla
    // addUser(newUser);
    const socket = await socketBackEnd();
    socket.emit("login user", newUser, async (res) => {
      await login(res);
    });
    props.history.push("/map");
  };
  //
  const addUser = (name) => {
    const newUsers = [...users, { name, done: false }];
    setUsers(newUsers);
  };

  const toggleleDoneUser = (i) => {
    const newUsersCopy = [...users];
    newUsersCopy[i].done = !newUsersCopy[i].done;
    setUsers(newUsersCopy);
  };

  const removeUser = (i) => {
    const newUsersCopy = [...users];
    newUsersCopy.splice(i, 1);
    setUsers(newUsersCopy);
  };

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSummit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="User name"
                    onChange={(e) => setNewUser(e.target.value)}
                    value={newUser}
                    ref={userInput}
                    autoComplete="none"
                    autoFocus
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block mt-2"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Login"
                  data-original-title="Tooltip on bottom"
                >
                  <i className="fas fa-location-arrow mr-1"></i>
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
