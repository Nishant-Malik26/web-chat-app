const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const socketIo = require("socket.io");
const Message = require("./models/Message");
const { v4: uuidv4 } = require("uuid"); // To generate unique chat IDs

const cors = require("cors");
const cookieParser = require("cookie-parser");
const Chat = require("./models/Chat");
const User = require("./models/User");
// const { WebSocketServer } = require("ws");
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { credentials: true, origin: "https://localhost:5173" },
});

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("db connected");
});

app.use(cookieParser());
app.use(express.json());
app.use(cors({ credentials: true, origin: "https://localhost:5173" }));

// const sockserver = new WebSocketServer({ port: 443 });
// const clients = {}; // Track connected clients

// sockserver.on("connection", (ws) => {
//   console.log("New client connected");

//   ws.on("message", (data) => {
//     const message = JSON.parse(data);

//     if (message.type === "connect") {
//       clients[message.owner] = ws; // Register user with their WebSocket connection
//       return;
//     }

//     // Handle regular messages
//     const recipientWs = clients[message.contactedUser];
//     if (recipientWs) {
//       recipientWs.send(JSON.stringify(message)); // Send message to the recipient
//     }
//   });

//   ws.on("close", () => {
//     // Remove the user from the clients list on disconnect
//     Object.keys(clients).forEach((userId) => {
//       if (clients[userId] === ws) {
//         delete clients[userId];
//       }
//     });
//     console.log("Client has disconnected!");
//   });

//   ws.onerror = () => {
//     console.log("WebSocket error");
//   };
// });
//
//

// io.on('connection', (socket) => {
//     console.log('A user connected');

//     // Send all previous messages to the client
//     Message.find().sort({ timestamp: 1 }).limit(50).exec((err, messages) => {
//         if (err) {
//             console.error(err);
//         } else {
//             socket.emit('loadMessages', messages);
//         }
//     });

//     socket.on('sendMessage', (data) => {
//         const newMessage = new Message(data);
//         newMessage.save().then(() => {
//             io.emit('receiveMessage', data);
//         });
//     });

//     socket.on('disconnect', () => {
//         console.log('A user disconnected');
//     });
// });
//
//
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("createChat", async ({ user1, user2 }) => {
    const contactedUserDoc = await User.findOne({ email: user2 });
    const ownerDoc = await User.findOne({ email: user1 });
    let chat = await Chat.findOne({
      participants: {
        $all: [
          { $elemMatch: { id: ownerDoc._id, name: ownerDoc?.name } },
          {
            $elemMatch: {
              id: contactedUserDoc._id,
              name: contactedUserDoc?.name,
            },
          },
        ],
      },
    });

    // If no chat is found, create a new one
    if (!chat) {
      chat = await Chat.create({
        participants: [
          { id: ownerDoc._id, name: ownerDoc?.name },
          { id: contactedUserDoc._id, name: contactedUserDoc?.name },
        ],
      });
    }

    console.log(chat._id?.toString(), "chat in socket");
    socket.emit("chatCreated", chat._id?.toString());
    socket.broadcast.emit("chatCreated", chat._id?.toString());
  });

  socket.on("joinChat", (chatId) => {
    socket.join(chatId);
    console.log(chatId, "chatIdchatId");
    Message.find({ chatId })
      .sort({ timestamp: 1 })
      .exec()
      .then((messages) => socket.emit("loadMessages", messages))
      .catch((err) => socket.emit("error", err));
  });

  socket.on("sendMessage", async ({ chatId, senderId, message }) => {
    const newMessage = new Message({ chatId, senderId, message });
    await newMessage.save();

    io.to(chatId).emit("receiveMessage", newMessage);
  });

  // Handle Video Call Signaling
  socket.on("offer", (data) => {
    console.log("data", data);
    socket
      .to(data.roomId)
      .emit("offer", { offer: data.offer, callerId: socket.id });
  });

  socket.on("answer", (data) => {
    socket.to(data.roomId).emit("answer", data.answer);
  });

  socket.on("decline-call", (data) => {
    socket.to(data.roomId).emit("call-ended");
  });

  socket.on("disconnectCall", () => {
    const roomId = Object.keys(socket.rooms)[0];
    io.to(roomId).emit("call-ended");
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

app.use("/api/auth", require("./routes/user"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/chat", require("./routes/chat"));

server.listen(process.env.PORT, () => {
  console.log("Server started on port", process.env.PORT);
});
