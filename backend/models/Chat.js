const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  contactedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  isArchived: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("chat", ChatSchema);
