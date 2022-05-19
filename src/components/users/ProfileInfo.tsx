import React from "react";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { useDatabase } from "../providers/DatabaseContext";

export function ProfileInfo() {
  const db = useDatabase();
  const username = db?.user?.userName;
  return (
    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      <Typography>{username && username}</Typography>
    </Box>
  );
}
