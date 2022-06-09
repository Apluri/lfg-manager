import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { LfgPosts } from "../LFG/LfgPosts";
import "./LfgScreen.css";

type Props = {
  style?: React.CSSProperties;
};
export function LfgScreen({ style }: Props) {
  return (
    <Box
      className="sceenContainer"
      sx={{
        alignItems: "center",
        flexDirection: "column",
        ...style,
      }}
    >
      <Typography variant="h6">Cute find party</Typography>
      <LfgPosts />
    </Box>
  );
}
