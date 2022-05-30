import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export function Login() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: "1em",
      }}
    >
      <Typography variant="h4">You must login in order to continue</Typography>
    </Box>
  );
}
