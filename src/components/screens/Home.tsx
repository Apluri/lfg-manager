import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../providers/AuthContext";
import { useDatabase } from "../providers/DatabaseContext";
import { Profile } from "../users/Profile";
import { LfgScreen } from "./LfgScreen";

function Home() {
  const db = useDatabase();
  const ayayaa = "https://i.waifu.pics/HeeBaFc.gif";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <LfgScreen style={{ flex: 2, marginLeft: "2em", marginRight: "2em" }} />
      <Profile style={{ flex: 1, marginRight: "2em" }} />
    </Box>
  );
}

export default Home;
