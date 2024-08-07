import React, { useEffect, useState } from "react";
import ChatHeader from "./ChatHeader.jsx";
import PropTypes from "prop-types";
import ChatFooter from "./ChatFooter.jsx";
import { useParams } from "react-router-dom";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  // const [interval, setInterval] = useState(false);
  const [chat, setChat] = useState({});
  let { id } = useParams();

  const [ws, setWs] = useState(null);
  console.log("🚀 ~ Chat ~ ws:", ws);

  useEffect(() => {
    setWs(new WebSocket("ws://localhost:443"));
  }, []);

  if (ws) {
    ws.onmessage = (client) => {
      console.log(client, "client");
      setMessages([]);
    };
  }

  Chat.propTypes = {
    messages: PropTypes.array,
  };

  // setInterval(() => {
  //   setInterval((prev) => !prev);
  // }, 10000);

  const callData = async () => {
    // fetch("http://localhost:5001/api/chat/messages", {
    //   method: "GET",
    //   credentials: "include",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setMessages(data?.messages);
    //   })
    //   .catch((err) => console.log(err));

    fetch("http://localhost:5001/api/chat/messages", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("🚀 ~ .then ~ data:", data);
        setChat(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    callData();
  }, [id]);

  return (
    <>
      <div className="flex flex-col h-screen">
        <ChatHeader
          onlineStatus={false}
          className="flex-shrink-0"
          ws={ws}
          chat={chat}
        />
        <div className="flex-grow overflow-y-auto p-4">
          {messages?.map((message) => {
            return (
              <div key={message?.id} className="flex w-full">
                <div
                  className={
                    message?.sent
                      ? "flex p-2 text-white font-md m-3 bg-[#5B96F7] rounded-md w-fit"
                      : "flex p-2 text-white font-md m-3 bg-[#5B96F7] rounded-md w-fit"
                  }
                >
                  {message?.text}
                </div>
              </div>
            );
          })}
        </div>
        <ChatFooter chat={chat} ws={ws} className="flex-shrink-0" />
      </div>
    </>
  );
};

export default Chat;
