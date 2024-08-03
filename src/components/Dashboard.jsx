import React from "react";
import ChatSection from "./ChatSection.jsx";
import Chat from "./Chat.jsx";

const Dashboard = () => {
  return (
    <div className="flex gap-x-8">
      <ChatSection
        chatData={[
          {
            id: "cvbscgshk",
            name: "John",
            latestMessage: "dont reply",
            lastTime: "12:00",
          },
        ]}
      />
      <Chat />
    </div>
  );
};

export default Dashboard;
