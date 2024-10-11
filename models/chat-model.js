const mongoose = require("mongoose");

const ChatSessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
      index: true, // Index for better query performance
    },
    sessions: [
      {
        chatSessionId: {
          type: mongoose.Schema.Types.ObjectId,
          default: () => new mongoose.Types.ObjectId(),
          index: true, // Index for better query performance
        },
        title: {
          type: String,
          default: () => new Date().toISOString(),
        },
        chats: [
          {
            question: {
              type: String,
              required: true,
            },
            answer: {
              type: String,
              required: true,
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

const ChatSessionModel = mongoose.model("ChatSession", ChatSessionSchema);

module.exports = ChatSessionModel;
