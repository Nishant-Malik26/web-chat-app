const express = require("express");
const Chat = require("../models/Chat");
const User = require("../models/User");
const Message = require("../models/Message");

const router = express.Router();
//CREATe new chat
router.post("/", async (req, res) => {
  const { owner, contactedUser } = req?.body;

  try {
    const contactedUserId = await User.findOne({
      email: contactedUser,
    });
    const ownerId = await User.findOne({
      email: owner,
    });
    const chat = await Chat.findOne({
      owner: ownerId?._id?.toString(),
      contactedUser: contactedUserId?._id?.toString(),
    });

    if (chat) {
      return res
        .status(200)
        .json({ chat: { ...chat?._doc, id: chat?._doc?._id?.toString() } });
    } else {
      const newChat = Chat({
        owner: ownerId?._id?.toString(),
        contactedUser: contactedUserId?._id?.toString(),
      });
      const chatX = await newChat.save();
      return res.status(201).json({
        chat: { ...chatX?._doc, id: chatX?._doc?._id?.toString() },
      });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
});

// get all chats for a user
router.get("/:email", async (req, res) => {
  const { email } = req?.params;
  //   console.log("🚀 ~ router.get ~ email:", email);
  try {
    const id = await User.findOne({ email });
    console.log("🚀 ~ router.get ~ id:", id);
    const response = await Chat.aggregate([
      {
        $match: {
          owner: id?._id,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "contactedUser",
          foreignField: "_id",
          as: "contactedUserDetails",
        },
      },
      {
        $unwind: "$contactedUserDetails",
      },

      
      //   ,
      //   {
      //     $lookup: {
      //       from: "message",
      //       let: { chatId: "$_id" },
      //       pipeline: [
      //         { $match: { $expr: { $eq: ["$chat", "$$chatId"] } } },
      //         { $unwind: "$message" },
      //         { $sort: { "message.time": -1 } },
      //         { $limit: 1 },
      //       ],
      //       as: "lastMessage",
      //     },
      //   },
      //   {
      //     $unwind: { path: "$lastMessage", preserveNullAndEmptyArrays: true },
      //   },
      //   {
      //     $project: {
      //       _id: 1,
      //       owner: 1,
      //       contactedUser: 1,
      //       "contactedUserDetails.name": 1,
      //       isBlocked: 1,
      //       isArchived: 1,
      //       lastMessageText: { $ifNull: ["$lastMessage.message.text", null] },
      //       lastMessageTime: { $ifNull: ["$lastMessage.message.time", null] },
      //     },
      //   },
    ]);
    console.log(response);
    if (!response?.length) {
      return res.status(400).json({ error: "No chats found" });
    } else {
      return res.status(200).json({ chat: response });
    }
  } catch (error) {
    return res.status(500).json({ error, chat: [] });
  }
});

// get a chat
router.get("/:id", async (req, res) => {
  //   const email = req?.body;
  const { id } = req.params;
  try {
    // const user = await User.findById({ email });
    const response = await Chat.findById(id);
    if (!response?.length) {
      return res.status(400).json({ error: "No chats found" });
    } else {
      return res.status(200).json({ response });
    }
  } catch (error) {
    return res.status(500).json({ error, chat: [] });
  }
});

// get all messages from a chat
router.get("/messages", async (req, res) => {
  const id = req?.body;
  try {
    const response = await Message.findById(id);
    const messages = await response.json();
    if (!response?.ok) {
      return res.status(400).json({ error: "No messages found", messages: [] });
    } else {
      return res.status(200).json({ messages });
    }
  } catch (error) {
    return res.status(500).json({ error, messages: [] });
  }
});

module.exports = router;
