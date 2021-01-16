import React, { useEffect, useState } from "react";
import socketBackEnd from "../../../filesJS/socketBackEnd";
import { currentUser } from "../../../filesJS/userSubject";

import TextContainer from "../TextContainer/TextContainer";
import Messages from "../Messages/Messages";
import Input from "../Input/Input";

const Chat = () => {
  const [name, setName] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);


  useEffect(async () => {
    const userData = await currentUser.value;
    //console.log("userData: ", userData);
    setName(userData.nickName);
    const socket = await socketBackEnd();
    socket.on("message", (message) => {
      console.log("message: ", message);
      setMessages((messages) => [...messages, message]);
    });
  }, []);

  useEffect(async () => {
    const socket = await socketBackEnd();
    socket.on("roomData", (userList) => {
      setTimeout(() => {
        //console.log("userList roomData: ", userList);
      }, 2000);
      //setUsers(users);
    });
  }, []);

  const sendMessage = async (event) => {
    event.preventDefault();

    if (message) {
      const req = {
        name,
        message
      }
      const socket = await socketBackEnd();
      await socket.emit("sendMessage", req, () => setMessage(""));
    }
  };

  //console.log("messages: ", messages);

  return (
    <div className="outerContainerChat">
      <div className="containerChat">
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <TextContainer users={users} />
    </div>
  );
};

export default Chat;
