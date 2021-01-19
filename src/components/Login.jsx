import React, { useEffect, useState, useRef } from "react";
import socketBackEnd from "../filesJS/socketBackEnd";
import {
  login,
  logout,
  currentUser,
  getCurrentUser,
  messageUser
} from "../filesJS/userSubject";

const Login = (props) => {
  const userInput = useRef(null);
  const [newUser, setNewUser] = useState("");
  const [newMsg, setNewMsg] = useState("");
  const [newMsgErr, setNewMsgErr] = useState("");
  useEffect(async () => {
    setNewUser("");
    setNewMsg("");
    const userData = await getCurrentUser();
    //const userData = await currentUser.value;
    let req = {
      nickName: userData?.nickName,
      position: [],
      online: false,
    };
    const socket = await socketBackEnd();
    socket.emit("userLogout", req, async (res) => {
      await logout();
    });
    setTimeout(async () => {
      const mesgeUser = await messageUser.value;
      setNewMsg(mesgeUser);
    }, 1000);
  }, []);

  const handleSummit = async (e) => {
    var isOk = false;
    e.preventDefault(); // Evita que se refresque la pantalla
    navigator.geolocation.getCurrentPosition(async (pos) => {
      let req = {
        nickName: newUser,
        position: [pos.coords.latitude, pos.coords.longitude],
        online: true,
      };
      const socket = await socketBackEnd();
      await socket.emit("login user", req, async (res) => {
        isOk = res?.Ok;
        await login(res);
      });
      setTimeout(async () => {
        const userData = await getCurrentUser();
        //const userData = await currentUser.value;
        if (userData.Ok == true) {
          props.history.push("/main");
        } else {
          setNewMsgErr(userData.msg)
        }
      }, 1000);
    });
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
                  className="btn btn-success btn-block mt-2"
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
      <div className="row">
        <div className="col-md-6 offset-md-3 ">
          <h5 className="text-info text-center mt-5">
            {newMsg}
          </h5>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 offset-md-3 ">
          <h5 className="text-danger text-center mt-5">
            {newMsgErr}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Login;
