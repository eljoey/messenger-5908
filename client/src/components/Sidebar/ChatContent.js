import React, { useEffect, useState } from "react";
import { Badge, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { fetchUnreadMessages } from "../../store/utils/thunkCreators";

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
    fontWeight: (props) => props.fontWeight,
    fontSize: 12,
    color: (props) => props.color,
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
  const { conversation, activeConversation } = props;
  const { latestMessageText, otherUser } = conversation;
  const isActiveConversation = activeConversation === conversation.otherUser.username;
  // conditionally set props for styling of unread vs read messages
  const styleProps = {
    fontWeight: !isActiveConversation && unreadMessages > 0 ? "bold" : "normal",
    color: !isActiveConversation && unreadMessages > 0 ? "" : "#9CADC8"
  };
  const classes = useStyles(styleProps);

  useEffect(() => {
    const newMessages = async () => {
      let unread = 0;

      // will find the unread messages if the conversation is not the current active one
      if (!isActiveConversation) {
        const data = await fetchUnreadMessages(conversation.id, conversation.otherUser.id);
        unread = data;
      };
      setUnreadMessages(unread);
    };

    if (conversation.otherUser && conversation.messages.length) {
      newMessages();
    }
  }, [conversation, activeConversation, isActiveConversation]);

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={classes.previewText}>
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
