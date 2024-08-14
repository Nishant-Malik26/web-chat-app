import React, { useEffect, useState } from "react";
import ChatHeader from "./ChatHeader.jsx";
import PropTypes from "prop-types";
import ChatFooter from "./ChatFooter.jsx";
import { useOutletContext, useParams } from "react-router-dom";
import VideoCall from "./VideoCall.jsx";

const Chat = () => {
  const { selectedChat, socket, messages, setMessages, setChatId, chatId } =
    useOutletContext();
  const [message, setMessage] = useState("");
  const [isCalling, setIsCalling] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      socket.emit("joinChat", id);
    }
  }, [id]);

  const sendMessage = () => {
    const newMessage = {
      chatId: id,
      senderId: localStorage.getItem("userId"),
      message,
    };
    socket.emit("sendMessage", newMessage);
    setMessage("");
  };

  const handleVideoCall = () => {
    setIsCalling(true);
    socket.emit("offer", { roomId: id });
  };

  const handleAudioCall = () => {
    // Implement audio call functionality
  };

  useEffect(() => {
    if (!socket) return;

    socket.on("chatCreated", (chatId) => {
      setChatId(chatId);
      socket.emit("joinChat", chatId);
    });

    socket.on("loadMessages", (loadedMessages) => {
      setMessages(loadedMessages);
    });

    socket.on("receiveMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("chatCreated");
      socket.off("loadMessages");
      socket.off("receiveMessage");
    };
  }, [socket]);

  return (
    <div className="flex flex-col h-screen">
      <ChatHeader
        onlineStatus={false}
        className="flex-shrink-0"
        handleVideoCall={handleVideoCall}
        handleAudioCall={handleAudioCall}
      />
      <div className="flex-grow overflow-y-auto p-4">
        {messages?.map((message) => (
          <div key={message?._id.toString()} className="flex w-full">
            <div
              className={
                message?.sent
                  ? "flex p-2 text-white font-md m-3 bg-[#5B96F7] rounded-md w-fit"
                  : "flex p-2 text-white font-md m-3 bg-[#5B96F7] rounded-md w-fit"
              }
            >
              {message?.message}
            </div>
          </div>
        ))}
      </div>
      {isCalling && (
        <VideoCall isCalling={isCalling} setIsCalling={setIsCalling} />
      )}
      <ChatFooter
        sendMessage={sendMessage}
        className="flex-shrink-0"
        setValue={setMessage}
        value={message}
      />
    </div>
  );
};

Chat.propTypes = {
  messages: PropTypes.array,
};

export default Chat;
