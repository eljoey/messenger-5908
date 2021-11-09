const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");
const ReadStatus = require("./readStatus");

// associations

User.hasMany(Conversation);
Conversation.hasMany(User);
Message.belongsTo(Conversation);
Conversation.hasMany(Message);
ReadStatus.belongsTo(Message);
Message.hasMany(ReadStatus);

module.exports = {
  User,
  Conversation,
  Message
};
