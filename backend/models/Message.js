const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "chat",
  },
  message: {
    type: Array,
  },
});

module.exports = mongoose.model("message", MessageSchema);
