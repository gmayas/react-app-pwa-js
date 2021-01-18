import socketIOClient from "socket.io-client";
const SocketBackEnd = "https://ioservergmayas.herokuapp.com/";

const socketBackEnd = async () => {
  const connectionOptions = {
    "force new connection": true,
    reconnectionAttempts: "Infinity",
    timeout: 10000,
    transports: ["websocket"],
  };
  return await socketIOClient(SocketBackEnd, connectionOptions);
};

export default socketBackEnd;
