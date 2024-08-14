import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, Button, Dropdown } from "antd";
import PropTypes from "prop-types";
import { IoLogOut, IoVideocamOutline } from "react-icons/io5";
import { MdOutlinePhone } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { logout } from "../redux/auth/authSlice";

const ChatHeader = ({ chat, onlineStatus, handleVideoCall, handleAudioCall }) => {
  const dispatch = useDispatch();

  const items = [
    {
      key: "1",
      label: (
        <Button icon={<IoLogOut />} onClick={() => dispatch(logout())}>
          Logout
        </Button>
      ),
    },
  ];

  return (
    <div className="pt-3 mt-1 flex justify-between gap-x-4 bg-[#FFFFFF] px-3 pb-2 items-center">
      <div className="flex gap-x-4">
        <Badge color={onlineStatus ? "green" : "red"} dot>
          <Avatar size={48} icon={<UserOutlined />} />
        </Badge>
        <div>
          <span>{chat?.name || "hello "}</span>
          <div className="text-xs text-gray-600">
            {onlineStatus ? "Online" : "Offline"}
          </div>
        </div>
      </div>
      <div className="flex text-xl gap-x-8 mb-2">
        <IoVideocamOutline onClick={handleVideoCall} />
        <MdOutlinePhone onClick={handleAudioCall} />
        <IoSearch />
        <Dropdown
          menu={{ items }}
          placement="bottom"
        >
          <IoEllipsisVerticalSharp />
        </Dropdown>
      </div>
    </div>
  );
};

ChatHeader.propTypes = {
  chat: PropTypes.object.isRequired,
  onlineStatus: PropTypes.bool.isRequired,
  handleVideoCall: PropTypes.func.isRequired,
  handleAudioCall: PropTypes.func.isRequired,
};

export default ChatHeader;