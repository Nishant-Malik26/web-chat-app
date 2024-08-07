import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, Button, Dropdown } from "antd";
import PropTypes from "prop-types";
import { IoLogOut, IoVideocamOutline } from "react-icons/io5";
import { MdOutlineLocalPhone } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { logout } from "../redux/auth/authSlice";

const ChatHeader = ({ name, onlineStatus }) => {
  const dispatch = useDispatch();
  ChatHeader.propTypes = {
    name: PropTypes.string.isRequired,
    onlineStatus: PropTypes.bool.isRequired,
  };

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
          <span>{name}</span>
          <div className="text-xs text-gray-600">
            {onlineStatus ? "Online" : "Offline"}
          </div>
        </div>
      </div>
      <div className="flex text-xl gap-x-8 mb-2">
        <IoVideocamOutline />
        <MdOutlineLocalPhone />
        <IoSearch />

        <Dropdown
          menu={{
            items,
          }}
          placement="bottom"
        >
          <IoEllipsisVerticalSharp />
        </Dropdown>
      </div>
    </div>
  );
};

export default ChatHeader;
