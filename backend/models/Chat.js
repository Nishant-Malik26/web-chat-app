const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    participants: [
      {
        id: { type: mongoose.Schema.Types.String, ref: "user" },
        name: { type: String },
      },
    ],
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
    contactedUserDetails: {
      type: Object,
      required: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Chat", ChatSchema);
