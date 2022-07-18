import React from "react";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { useDatabase, UserData } from "../providers/DatabaseContext";

type Props = {
  onClick?: (event: any, user?: UserData) => void;
  user: UserData | null | undefined;
};
export function ProfileInfo({ onClick, user }: Props) {
  const db = useDatabase();
  const username = user?.userName;
  return (
    <Box
      onClick={(e) => {
        if (onClick && user) onClick(e, user);
        if (onClick) onClick(e);
      }}
      sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <Typography variant="h6">
        {username ? username : "Anonymous user"}
      </Typography>
    </Box>
  );
}
