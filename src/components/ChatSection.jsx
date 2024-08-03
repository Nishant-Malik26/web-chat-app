import React from "react";
import PropTypes from "prop-types";
import { Avatar, Input } from "antd";
const { Search } = Input;
import { LuCircleDashed } from "react-icons/lu";
import { BsArchive } from "react-icons/bs";
import { UserOutlined } from "@ant-design/icons";

const ChatSection = ({ chatData }) => {
  ChatSection.propTypes = {
    chatData: PropTypes.array.isRequired,
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
          <div key={chat?.id} className="flex justify-around bg-[#F8F9FA] p-3">
            <Avatar size={48} icon={<UserOutlined />} />
            <div className="text-sm">
              {chat?.name} <br />
              {chat?.latestMessage}
            </div>
            <div className="text-xs font-thin">{chat?.lastTime}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatSection;
