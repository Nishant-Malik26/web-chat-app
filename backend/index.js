const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const auth = require("./middlewares/auth");
const { WebSocketServer } = require("ws");

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("db connected");
});

const sockserver = new WebSocketServer({ port: 443 });

sockserver.on("connection", (ws) => {
  ws.send("connection established");
  ws.on("close", () => console.log("Client has disconnected!"));
  ws.on("message", (data) => {
    sockserver.clients.forEach((client) => {
      console.log("🚀 ~ sockserver.clients.forEach ~ client:", client);
      console.log(`distributing message: ${data}`);
      client.send(`${data}`);
    });
  });
  ws.onerror = function () {
    console.log("websocket error");
  };
});

app.use(cookieParser());

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use("/api/auth", require("./routes/user"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/chat", require("./routes/chat"));

app.listen(process.env.PORT, () => {
  console.log("started ");
});
