import { Input } from "antd";
import React, { useState } from "react";
import { IoIosLink } from "react-icons/io";
import { BsEmojiSmile } from "react-icons/bs";
import { AiOutlineSend } from "react-icons/ai";
import PropTypes from "prop-types";

const ChatFooter = ({ ws, chat }) => {
  console.log("🚀 ~ ChatFooter ~ chat:", chat);
  const [value, setValue] = useState("");
  ChatFooter.propTypes = {
    ws: PropTypes.any,
    chat: PropTypes.object,
  };
  const handleSendMessage = () => {
    ws.send(
      JSON.stringify({
        
        text: value,
        owner: localStorage.getItem("email"),
        contactedUser: chat?.contactedUser,
        onlineStatus: 1,
      })
    );
  };

  return (
    <div className="py-4 px-2 flex gap-x-2 items-center leading-7">
      <Input
        value={value}
        onChange={(e) => setValue(e?.target?.value)}
        addonBefore={<IoIosLink />}
        addonAfter={<BsEmojiSmile />}
        placeholder="Write a message"
      />
      <AiOutlineSend size={34} onClick={handleSendMessage} />
    </div>
  );
};

export default ChatFooter;
