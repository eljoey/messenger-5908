import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";
import axios from "axios";

axios.interceptors.request.use(async function (config) {
  const token = await localStorage.getItem("messenger-token");
  config.headers["x-access-token"] = token;

  return config;
});

const Messages = (props) => {
  const { messages, otherUser, userId } = props;
  const [lastReadIndex, setLastReadIndex] = useState(-1);

  useEffect(() => {
    let index = messages.length - 1;

    while (index >= 0) {
      if (messages[index].senderId === userId && messages[index].read) {
        break;
      }
      index--;
    }

    setLastReadIndex(index);
  }, [messages, userId]);

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
