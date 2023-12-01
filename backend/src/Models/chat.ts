// 채팅 스키마 만들기 
const chatMongoose = require("mongoose");

const chatSchema = new chatMongoose.Schema({
  chat: String,
  user: {
    id: {
      type: chatMongoose.Schema.ObjectId,
      ref: "User",
    },
    name: String,
  },
},
{
    timestamps: true
});

module.exports = chatMongoose.model("Chat", chatSchema);
