import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../providers/AuthContext";
import { useDatabase } from "../providers/DatabaseContext";
import { Profile } from "../users/Profile";
import { LfgScreen } from "./LfgScreen";

function Home() {
  const db = useDatabase();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <LfgScreen style={{ flex: 1 }} />
      <Profile style={{ flex: 1 }} />
    </Box>
  );
}

export default Home;
