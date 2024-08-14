const express = require("express");
const Chat = require("../models/Chat");
const User = require("../models/User");
const Message = require("../models/Message");
const { v4: uuidv4 } = require("uuid"); // To generate unique chat IDs

const router = express.Router();

// Create or retrieve chat
router.post("/", async (req, res) => {
  const { user1, user2 } = req.body;

  try {
    const contactedUserDoc = await User.findOne({ email: user2 });
    const ownerDoc = await User.findOne({ email: user1 });

    if (!contactedUserDoc && !ownerDoc) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find or create a chat between the two users
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

    return res.status(200).json({
      chat: {
        isBlocked: chat?.isBlocked,
        isArchived: chat?.isArchived,
        participants: chat.participants.map((participant) => {
          return {
            id: participant?._id?.toString(),
            name: participant?.name,
          };
        }),
        id: chat._id.toString(),
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//Get all chats for a user
router.get("/:email", async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const chats = await Chat.find({
      participants: { $elemMatch: { id: user._id, name: user?.name } },
      // { participants: [contactedUserDoc._id, ownerDoc._id] },
    });

    if (!chats.length) {
      return res.status(404).json({ error: "No chats found" });
    }

    return res.status(200).json({ chats });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Get a chat by ID
router.get("/chat/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const chat = await Chat.findById(id);

    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }

    return res.status(200).json({ chat });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Get all messages from a chat
router.get("/messages/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const messages = await Message.findOne({ chat: id });
    if (!messages) {
      return res.status(404).json({ error: "Messages not found" });
    }
    return res.status(200).json({ messages });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Send a message
router.post("/messages/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const message = await Message.findOneAndUpdate(
      { chat: id },
      { $push: { message: data } },
      { new: true, upsert: true },
    );

    return res.status(201).json({ messages: message });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
