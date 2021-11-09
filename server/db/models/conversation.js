const { Op, Sequelize } = require("sequelize");
const db = require("../db");
const Message = require("./message");

const Conversation = db.define("conversation", {});

// find conversation given two user Ids

Conversation.countNewMessages = async function (conversationId, userId) {
  const count = await Message.count({
    where: {
      conversationId,
      senderId: {
        [Op.ne]: userId
      },
      readStatus: {
        read: false,
        readBy: {
          [Op.ne]: userId
        }
      }
    }
  });

  return count;
};

module.exports = Conversation;
