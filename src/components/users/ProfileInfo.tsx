import React from "react";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { useAuth } from "../providers/AuthContext";

export function ProfileInfo() {
  const auth = useAuth();
  const username = "Username";
  return (
    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      <Typography>{auth?.currentUser && username}</Typography>
    </Box>
  );
}
