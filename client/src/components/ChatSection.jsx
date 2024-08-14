import React, { useState } from "react";
import PropTypes from "prop-types";
import { Avatar, Input } from "antd";
const { Search } = Input;
import { LuCircleDashed } from "react-icons/lu";
import { BsArchive } from "react-icons/bs";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const ChatSection = ({ chatData, setSelectedChat, socket }) => {
  const navigate = useNavigate();
  ChatSection.propTypes = {
    chatData: PropTypes.array.isRequired,
    setSelectedChat: PropTypes.any,
    socket: PropTypes.any,
  };
  const onSearch = () => {};
  return (
    <div className="flex flex-col gap-y-7 h-screen border-r-2 pr-5">
      <div className="flex justify-between font-semibold text-3xl mt-4">
        <span>Chats</span>
        <LuCircleDashed />
      </div>
      <Search
        placeholder="input search text"
        onSearch={onSearch}
        style={{
          width: 200,
        }}
      />
      <div className="flex items-center gap-x-2">
        <BsArchive />
        Archived
      </div>
      {chatData?.map((chat) => {
        return (
          <div
            key={chat?._id?.toString()}
            className="flex justify-around bg-[#F8F9FA] p-3"
            onClick={() => {
              setSelectedChat(chat);
              navigate(`/dashboard/chat/${chat?._id}`);
              socket.emit("joinChat", chat?._id?.toString());
            }}
          >
            <Avatar size={48} icon={<UserOutlined />} />
            <div className="text-sm">
              {
                chat?.participants?.find(
                  (participant) =>
                    participant?.id !== localStorage.getItem("userId")
                )?.name
              }
              <br />
              {chat?.latestMessage}
            </div>
            <div className="text-xs font-thin">
              {dayjs(chat?.updatedAt).format("DD MMM YYYY")}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatSection;
