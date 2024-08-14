import { AutoComplete, Button, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../redux/chat/user";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

const StartConversation = ({ setSelectedChat }) => {
  const [isModalOpen, setIsModelOpen] = useState(false);
  const [value, setValue] = useState("");
  const users = useSelector((state) => state?.user?.users);
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const newSocket = io("http://localhost:5001", {
      withCredentials: true,
    });
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const dispatch = useDispatch();
  const handleShowModal = () => {
    setIsModelOpen((prev) => !prev);
  };

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleOk = async () => {
    setIsModelOpen(false);
    try {
      const response = await fetch("http://localhost:5001/api/chat", {
        method: "POST",
        body: JSON.stringify({
          user1: localStorage.getItem("email"),
          user2: value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const chat = await response.json();
      navigate(`/dashboard/chat/${chat?.chat?.id}`);
      socket.emit("createChat", {
        user1: localStorage.getItem("email"),
        user2: value,
      });
      setSelectedChat(chat?.chat);
    } catch (error) {
      console.log("Error starting conversation:", error);
    }
  };

  return (
    <div>
      Please select a chat to continue or start
      <Button type="link" onClick={handleShowModal}>
        new conversation
      </Button>
      <Modal
        open={isModalOpen}
        closable
        onOk={handleOk}
        onCancel={() => {
          setValue("");
          setIsModelOpen(false);
        }}
      >
        <AutoComplete
          style={{ width: 200 }}
          value={value}
          onSelect={(val) => setValue(val)}
          onChange={(val) => setValue(val)}
          options={users.map((user) => ({ ...user, value: user?.email }))}
          placeholder="search user to chat"
          filterOption={(inputValue, option) =>
            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        />
      </Modal>
    </div>
  );
};

export default StartConversation;
