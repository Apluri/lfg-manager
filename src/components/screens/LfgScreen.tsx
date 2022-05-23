import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { LfgPosts } from "../LFG/LfgPosts";

type Props = {
  style?: React.CSSProperties;
};
export function LfgScreen({ style }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
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
