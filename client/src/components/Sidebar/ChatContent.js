import React, { useEffect, useState } from "react";
import { Badge, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    marginRight: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17,
  },
  boldPreviewText: {
    fontWeight: "bold",
    fontSize: 12,
    letterSpacing: -0.17,
  },
  unreadMessages: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  }
}));

axios.interceptors.request.use(async function (config) {
  const token = await localStorage.getItem("messenger-token");
  config.headers["x-access-token"] = token;

  return config;
});

const ChatContent = (props) => {
  const [unreadMessages, setUnreadMessages] = useState(0);
  const classes = useStyles(props, unreadMessages);
  const { conversation, activeConversation } = props;
  const { latestMessageText, otherUser } = conversation;
  const isActiveConversation = activeConversation === conversation.otherUser.username;

  useEffect(() => {
    const newMessages = async () => {
      let unread = 0;

      // will find the unread messages if the conversation is not the current active one
      if (!isActiveConversation) {
        const body = { conversationId: conversation.id, senderId: conversation.otherUser.id };

        const { data } = await axios.post("/api/conversations/read-status", body);

        unread = data.newMessageCount;
      }

      setUnreadMessages(unread);
    };

    if (conversation.otherUser) {
      newMessages();
    }
  }, [conversation, activeConversation, isActiveConversation]);


  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={!isActiveConversation && unreadMessages > 0 ? classes.boldPreviewText : classes.previewText}>
          {latestMessageText}
        </Typography>
      </Box>
      {!isActiveConversation && unreadMessages > 0 &&
        <Box className={classes.unreadMessages}>
          <Badge badgeContent={unreadMessages} color="primary" />
        </Box>
      }
    </Box>
  );
};

export default ChatContent;
