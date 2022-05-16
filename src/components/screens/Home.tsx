import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../providers/AuthContext";
import { useDatabase } from "../providers/DatabaseContext";
import { Profile } from "../users/Profile";

function Home() {
  const db = useDatabase();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Paper style={{ flex: 1, margin: "1em" }}> Tähän tulis vissii lfg</Paper>
      <Profile style={{ flex: 1 }} />
    </Box>
  );
}

export default Home;
