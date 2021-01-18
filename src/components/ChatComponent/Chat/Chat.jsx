import React, { useEffect, useState } from "react";
import socketBackEnd from "../../../filesJS/socketBackEnd";
import { currentUser } from "../../../filesJS/userSubject";

import TextContainer from "../TextContainer/TextContainer";
import Messages from "../Messages/Messages";
import Input from "../Input/Input";
import InfoBar from "../InfoBar/InfoBar";

const Chat = () => {
  const [name, setName] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(async () => {
    const userData = await currentUser.value;
    setName(userData.nickName);
  }, []);

  useEffect(async () => {
    const socket = await socketBackEnd();
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });
  }, []);

  useEffect(async () => {
    const userData = await currentUser.value;
    const socket = await socketBackEnd();
    const nickName = userData.nickName;
    await socket.emit("getRoomData", nickName, (res) => {
    });
  }, []);

  useEffect(async () => {
    const socket = await socketBackEnd();
    await socket.on("roomData", (userList) => {
      setUsers(userList);
    });
  }, []);

  useEffect(async () => {
    const socket = await socketBackEnd();
    await socket.emit("loadoldmsgs", true, (messages) => {
      setMessages(messages);
    });
  }, []);

  const sendMessage = async (event) => {
    event.preventDefault();
    if (message) {
      const req = {
        name,
        message,
      };
      const socket = await socketBackEnd();
      await socket.emit("sendMessage", req, () => setMessage(""));
    }
  };

  return (
    <div className="outerContainerChat">
      <div className="containerChat">
       <InfoBar dataIn={name} />
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
