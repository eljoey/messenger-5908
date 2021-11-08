import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";
import { fetchUnreadMessages } from "../../store/utils/thunkCreators";

const Messages = (props) => {
  const { messages, otherUser, userId } = props;
  const [lastReadIndex, setLastReadIndex] = useState(-1);
  const [unreadMessages, setUnreadMessages] = useState(null);

  useEffect(() => {
    const getUnreadMessages = async () => {
      const data = await fetchUnreadMessages(messages[0].conversationId, userId);
      setUnreadMessages(data);
    };
    getUnreadMessages();

    let count = unreadMessages;

    for (let i = messages.length - 1; i >= 0; i--) {
      if (count === 0 && messages[i].senderId === userId) {
        setLastReadIndex(i);
        break;
      }
      if (messages[i].senderId === userId) {
        count--;
      }
    }
  }, [messages.length, otherUser.id, unreadMessages, userId]);

  return (
    <Box>
      {messages.map((message, index) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
          <SenderBubble key={message.id} text={message.text} time={time} isLastRead={lastReadIndex === index} otherUser={otherUser} />
        ) : (
          <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} />
        );
      })}
    </Box>
  );
};

export default Messages;
