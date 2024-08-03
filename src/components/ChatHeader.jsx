import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Badge } from "antd";
import PropTypes from "prop-types";

const ChatHeader = ({ name, onlineStatus }) => {
  ChatHeader.propTypes = {
    name: PropTypes.string.isRequired,
    onlineStatus: PropTypes.bool.isRequired,
  };

  return (
    <div className="pt-3 mt-1 flex gap-x-4">
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
    </div>
  );
};

export default ChatHeader;
