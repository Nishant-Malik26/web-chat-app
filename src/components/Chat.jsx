import React from "react";
import ChatHeader from "./ChatHeader.jsx";

const Chat = () => {
  return (
    <>
      <div className="h-20">
        <ChatHeader name="John Doe" onlineStatus={false} />
      </div>
    </>
  );
};

export default Chat;
