import React, { useEffect, useState, useRef } from "react";

const Chat = () => {
  const msgInput = useRef(null);
  // Se define el estado de los usuarios en este componente
  const [newMsg, setNewMsg] = useState("");

  useEffect(async () => {
    setNewMsg("");
  }, []);

  // Control de summit y eventos de las paginas HTLM de tipo Form
  const handleSummit = async (e) => {
    var isOk = false;
    e.preventDefault(); // Evita que se refresque la pantalla
    console.log("newMsg:", newMsg);
    // addUser(newUser);
  };

  return (
    <div className="container ml-4">
      <div className="row">
        <div className="card">
          <div className="card-header">
            <h4>Let's Chat</h4>
          </div>
          <div id="chat" className="card-body"></div>
          <form
            id="message-form"
            className="card-footer"
            onSubmit={handleSummit}
          >
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Write your message here"
                onChange={(e) => {
                  e.preventDefault();
                  setNewMsg(e.target.value);
                }}
                value={newMsg}
                ref={msgInput}
                autoComplete="none"
                autoFocus
              ></input>
              <div className="input-group-append">
                <button type="submit" className="btn btn-success">
                  <i className="fas fa-location-arrow mr-1"></i>
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="row">
        <div className="card">
          <div className="card-header">
            <h4>Users:</h4>
          </div>
          <div className="card-body">
            <div id="userNames"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
