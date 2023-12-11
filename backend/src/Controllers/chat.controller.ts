import { UserInfo } from "../types/user.type";

const Chat = require("../Models/chat");
const chatController = {
  saveChat: async (message: string, user: UserInfo) => {
    const newMessage = new Chat({
      chat: message,
      user: {
        id: user._id,
        name: user.name,
      },
    });
    await newMessage.save();
    return newMessage;
  },
};

module.exports = chatController;
