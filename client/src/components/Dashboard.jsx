import React, { useEffect, useState } from "react";
import ChatSection from "./ChatSection.jsx";
import Chat from "./Chat.jsx";
import { Col, Row } from "antd";
import StartConversation from "./StartConversation.jsx";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  // const chatData = useSelector()
  const [chatData, setChatData] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5001/api/chat/${localStorage.getItem("email")}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("🚀 ~ .then ~ data:", data);
        setChatData(data?.chat);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Row>
      <Col span={6}>
        <ChatSection setSelectedChat={setSelectedChat} chatData={chatData} />
      </Col>
      <Col span={18}>
        {selectedChat ? (
          <Outlet />
        ) : (
          // <Chat
          //   messages={[
          //     { id: "bcsvj", text: "cshjcsj", sent: false },
          //     { id: "cskks", text: "sent by me ", sent: true },
          //   ]}
          // />
          <StartConversation setSelectedChat={setSelectedChat} />
        )}
      </Col>
    </Row>
  );
};

export default Dashboard;
