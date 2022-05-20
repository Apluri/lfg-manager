import React from "react";
import { Paper, Typography } from "@mui/material";

export function EmptySlot() {
  return (
    <Paper
      elevation={2}
      sx={{
        display: "flex",
        flex: 1,
        padding: "10px",
        marginTop: "1em",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography>Empty slot</Typography>
    </Paper>
  );
}
