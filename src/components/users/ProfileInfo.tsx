import React from "react";
import { Box, Button } from "@mui/material";
import { useAuth } from "../providers/AuthContext";

export function ProfileInfo() {
  const auth = useAuth();
  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <p>{auth?.currentUser && auth?.currentUser.email}</p>
      <Button onClick={() => auth?.logOut()}> Log out</Button>
    </Box>
  );
}
