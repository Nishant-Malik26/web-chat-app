import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import SimplePeer from "simple-peer";

const VideoCall = ({ isCalling, setIsCalling }) => {
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const peerRef = useRef();
  const [callIncoming, setCallIncoming] = useState(false);
  const [callAccepted, setCallAccepted] = useState(false);
  const [caller, setCaller] = useState(null);
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const newSocket = io("http://localhost:5001", {
      withCredentials: true,
    });
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("offer", ({ offer, callerId }) => {
        setCaller(callerId);
        setCallIncoming(true);

        peerRef.current = new SimplePeer({
          initiator: false,
          trickle: false,
        });

        peerRef.current.on("signal", (signalData) => {
          socket.emit("answer", {
            answer: signalData,
            roomId: socket?.room,
          });
        });

        peerRef.current.signal(offer);

        peerRef.current.on("stream", (remoteStream) => {
          remoteVideoRef.current.srcObject = remoteStream;
        });

        peerRef.current.on("error", (err) => {
          console.error("Peer connection error:", err);
        });

        peerRef.current.on("close", () => {
          console.log("Peer connection closed");
        });
      });

      socket.on("call-ended", () => {
        if (peerRef.current) {
          peerRef.current.destroy();
        }
        setCallIncoming(false);
        setCallAccepted(false);
        setIsCalling(false);
      });
    }

    return () => {
      if (peerRef.current) {
        peerRef.current.destroy();
      }

      socket && socket.disconnect();
    };
  }, [socket, peerRef]);

  const startCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      localVideoRef.current.srcObject = stream;

      peerRef.current = new SimplePeer({
        initiator: true,
        trickle: true,
        stream,
      });

      console.log(
        stream,
        "stream",
        localVideoRef,
        "llakdljadljdl",
        "peerRef",
        peerRef
      );

      peerRef.current.on("signal", (offer) => {
        socket.emit("offer", { offer, roomId: socket.room });
      });

      peerRef.current.on("stream", (remoteStream) => {
        remoteVideoRef.current.srcObject = remoteStream;
      });

      peerRef.current.on("error", (err) => {
        console.error("Peer connection error:", err);
      });

      peerRef.current.on("close", () => {
        console.log("Peer connection closed");
      });
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };

  useEffect(() => {
    if (isCalling) {
      startCall();
    }
  }, [isCalling]);

  const acceptCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      localVideoRef.current.srcObject = stream;
      setCallAccepted(true);

      peerRef.current.addStream(stream);
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };

  const declineCall = () => {
    socket.emit("decline-call", { roomId: socket.room });
    if (peerRef.current) {
      peerRef.current.destroy();
    }
    setCallIncoming(false);
  };

  return (
    <div>
      <div>
        {callIncoming && !callAccepted && (
          <div>
            <p>Incoming call...</p>
            <button onClick={acceptCall}>Accept</button>
            <button onClick={declineCall}>Decline</button>
          </div>
        )}
      </div>
      <div>
        <video ref={localVideoRef} autoPlay playsInline muted />
      </div>
      <div>
        <video ref={remoteVideoRef} autoPlay playsInline />
      </div>
    </div>
  );
};

export default VideoCall;
