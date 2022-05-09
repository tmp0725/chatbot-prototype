import { Key } from "react";
import List from "@mui/material/List";
import { Avatar, ListItem, ListItemAvatar } from "@mui/material";

const Chats = (props: { chats: string[] }): JSX.Element => {
  const { chats } = props;
  return (
    <>
      {chats?.map((chat: any, id: Key): JSX.Element => {
        const { type, text } = chat;
        const question: boolean = type === "question";
        const leftOrRight = question ? "left-position" : "right-position";
        return (
          <List key={id}>
            <ListItem className={leftOrRight}>
              <ListItemAvatar>
                {question ? (
                  <Avatar alt="icon" src="../../pepper.jpg" />
                ) : (
                  <Avatar alt="icon" src="../../no-profile.png" />
                )}
              </ListItemAvatar>
              <div>{text}</div>
            </ListItem>
          </List>
        );
      })}
    </>
  );
};

export default Chats;
