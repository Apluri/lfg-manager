import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../providers/AuthContext";
import { useDatabase } from "../providers/DatabaseContext";
import { Profile } from "../users/Profile";
import { LfgScreen } from "./LfgScreen";
import "./Home.css";

function Home() {
  const db = useDatabase();
  const ayayaa = "https://i.waifu.pics/HeeBaFc.gif";

  return (
    <Box className="screenContainer">
      <LfgScreen
        style={{
          flex: 1,
        }}
      />
      <Profile stackMinWidth={280} />
    </Box>
  );
}

export default Home;
