import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:4001";
//http://localhost:3000/

function App() {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    var connectionOptions = {
      "force new connection": true,
      reconnectionAttempts: "Infinity",
      timeout: 10000,
      transports: ["websocket"],
    };

    const socket = socketIOClient(ENDPOINT, connectionOptions);
    socket.on("FromAPI", (data) => {
      console.log("FromAPI: ", data);
      setResponse(data);
    });
  }, []);

  return (
    <p>
      It's <time dateTime={response}>{response}</time>
    </p>
  );
}

export default App;
