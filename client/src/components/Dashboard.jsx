import React, { useEffect, useState } from "react";
import ChatSection from "./ChatSection.jsx";
import { Col, Row } from "antd";
import StartConversation from "./StartConversation.jsx";
import { Outlet } from "react-router-dom";
import io from "socket.io-client";

const Dashboard = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatData, setChatData] = useState([]);
  const [chatId, setChatId] = useState(null);
  const [messages, setMessages] = useState([]);

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:5001", {
      withCredentials: true,
    });
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("connected succesfully");
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("chatCreated", (chatId) => {
      setChatId(chatId);
      socket.emit("joinChat", chatId);
    });

    socket.on("loadMessages", (loadedMessages) => {
      setMessages(loadedMessages);
    });

    socket.on("receiveMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("chatCreated");
      socket.off("loadMessages");
      socket.off("receiveMessage");
    };
  }, [socket]);

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      fetch(`http://localhost:5001/api/chat/${email}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setChatData(data?.chats);
        })
        .catch((err) => console.log("Error loading chats:", err));
    }
  }, []);

  return (
    <Row>
      <Col span={6}>
        <ChatSection
          setSelectedChat={setSelectedChat}
          socket={socket}
          chatData={chatData}
        />
      </Col>
      <Col span={18}>
        {selectedChat ? (
          <Outlet
            context={{
              selectedChat,
              chatId,
              setMessages,
              messages,
              socket,
              setChatId,
            }}
          />
        ) : (
          <StartConversation setSelectedChat={setSelectedChat} />
        )}
      </Col>
    </Row>
  );
};

export default Dashboard;
