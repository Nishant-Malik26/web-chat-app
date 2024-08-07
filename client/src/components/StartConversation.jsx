import { AutoComplete, Button, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../redux/chat/user";
import { useNavigate } from "react-router-dom";

const StartConversation = ({ setSelectedChat }) => {
  const [isModalOpen, setIsModelOpen] = useState(false);
  const [value, setValue] = useState("");
  const users = useSelector((state) => state?.user?.users);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleShowModal = () => {
    setIsModelOpen((prev) => !prev);
  };

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);

  const handleOk = async () => {
    setIsModelOpen(false);
    try {
      const response = await fetch("http://localhost:5001/api/chat", {
        method: "POST",

        body: JSON.stringify({
          contactedUser: value,
          owner: localStorage.getItem("email"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const chat = await response.json();
      console.log("🚀 ~ handleOk ~ chat:", chat);
      navigate(`/dashboard/chat/${chat?.chat?.id}`);
      setSelectedChat(chat?.chat);
    } catch (error) {
      console.log(error);
    }
  };

  //   const handleSendMessage = () => {
  //     ws.send("hello");

  //   };

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
          style={{
            width: 200,
          }}
          value={value}
          onSelect={(val) => setValue(val)}
          onChange={(val) => setValue(val)}
          options={users.map((user) => {
            return { ...user, value: user?.email };
          })}
          placeholder="search user to chat"
          filterOption={(inputValue, option) =>
            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        />

        {/* <div>
          <Button>Call</Button>
          <Button>Video Call</Button>
          <Button onClick={handleSendMessage}>Message</Button>
        </div> */}
      </Modal>
    </div>
  );
};

export default StartConversation;
