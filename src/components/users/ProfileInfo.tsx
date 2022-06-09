import React from "react";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { useDatabase } from "../providers/DatabaseContext";

type Props = {
  onClick?: (event: any) => void;
};
export function ProfileInfo({ onClick }: Props) {
  const db = useDatabase();
  const username = db?.user?.userName;
  return (
    <Box
      onClick={(e) => onClick && onClick(e)}
      sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <Typography variant="h6">{username && username}</Typography>
    </Box>
  );
}
