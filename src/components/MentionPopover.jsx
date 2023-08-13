import {
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Popover,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { db } from "../database";

export default function MentionPopover({ coords, onClose, onMentionClick }) {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = () => {
    db.collection("users")
      .get()
      .then((snapshot) => {
        const users = [];
        snapshot.forEach((user) => users.push(user.data()));
        setUsers(users.slice(0, 3));
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Popover
      open
      anchorReference="anchorPosition"
      anchorPosition={{ top: coords.top, left: coords.left }}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      onClose={(_, reason) => {
        if (reason === "backdropClick") {
          onClose();
        }
      }}
    >
      <Box
        sx={[
          { width: "300px", minHeight: "60px" },
          isLoading && {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        {isLoading ? (
          <CircularProgress />
        ) : (
          <List>
            {users.map((user) => (
              <ListItem key={user.email}>
                <ListItemButton onClick={() => onMentionClick(user)}>
                  <ListItemText>
                    {user.username} ({user.email})
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Popover>
  );
}
