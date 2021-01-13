import React, { useEffect, useState, useRef } from "react";
import socketBackEnd from "../filesJS/socketBackEnd";
import { login, logout, getCurrentUser, currentUser} from "../filesJS/userSubject";

const Login = (props) => {
  const userInput = useRef(null);
  // Se define el estado de los usuarios en este componente
  const [newUser, setNewUser] = useState("");
  // Se definen las tareas
  const [users, setUsers] = useState([]);
  useEffect(async () => {
    setNewUser("");
    setUsers([]);
    console.log("Si pasa...");
    //const userData = await getCurrentUser();
    const userData = await currentUser.value;
    let req = {
      nickName: userData?.nickName,
      position: [],
      online: false,
    };
    const socket = await socketBackEnd();
    socket.emit("userLogout", req, async (res) => {
      //console.log("userLogout res: ", res);
      await logout();
    });
  }, []);

  // Control de summit y eventos de las paginas HTLM de tipo Form
  const handleSummit = async (e) => {
    var isOk = false;
    e.preventDefault(); // Evita que se refresque la pantalla
    // addUser(newUser);
    navigator.geolocation.getCurrentPosition(async (pos) => {
    let req = {
        nickName: newUser,
        position: [pos.coords.latitude, pos.coords.longitude],
        online: true,
      };
      //console.log("Login user req: ", req);
      const socket = await socketBackEnd();
      await socket.emit("login user", req, async (res) => {
        console.log("login user res: ", res);
        isOk = res?.Ok
        await login(res);
      });
      setTimeout(async() => {
        const userData = await getCurrentUser();
        //console.log("Login user userData XXX: ", userData);
        if (userData.Ok == true) {props.history.push("/main")};
      }, 5000)
    });
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
                  className="btn  btn-success btn-block mt-2"
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
