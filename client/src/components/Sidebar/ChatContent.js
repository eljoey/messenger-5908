import React from "react";
import { Box, Chip, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
  unreadMessages: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  }
}));

const ChatContent = (props) => {
  const classes = useStyles();

  const { conversation } = props;
  const { latestMessageText, otherUser } = conversation;

  // counts all unread messages in conversation
  const unreadMessages = conversation.messages.reduce((prev, cur) => {
    if (!cur.read && otherUser.id === cur.senderId) {
      prev++;
    }

    return prev;
  }, 0);

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
      {unreadMessages > 0 &&
        <Box className={classes.unreadMessages}>
          <Chip label={unreadMessages} color="primary" />
        </Box>
      }
    </Box>
  );
};

export default ChatContent;
