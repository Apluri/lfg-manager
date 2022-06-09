import React from "react";
import { Paper, Typography } from "@mui/material";

export function EmptySlot() {
  return (
    <Paper className="applicantCard" elevation={2}>
      <Typography>Empty slot</Typography>
    </Paper>
  );
}
