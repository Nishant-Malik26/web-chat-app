import { Input } from "antd";
import React, { useState } from "react";
import { IoIosLink } from "react-icons/io";
import { BsEmojiSmile } from "react-icons/bs";
import { AiOutlineSend } from "react-icons/ai";
import PropTypes from "prop-types";

const ChatFooter = ({ sendMessage, setValue, value }) => {
  ChatFooter.propTypes = {
    sendMessage: PropTypes.func,
    chat: PropTypes.object,
    setValue: PropTypes.any,
    value: PropTypes.any,
    
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
      <AiOutlineSend size={34} onClick={sendMessage} />
    </div>
  );
};

export default ChatFooter;
