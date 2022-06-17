import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Paper } from "@mui/material";
import React from "react";
import { useAuth } from "../providers/AuthContext";
import GoogleIcon from "@mui/icons-material/Google";

export function Login() {
  const auth = useAuth();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "1em",
      }}
    >
      <Typography variant="h4">
        Authentication required to view LFG content
      </Typography>

      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "2em",
          marginTop: "2em",
        }}
      >
        <Button
          variant="outlined"
          startIcon={<GoogleIcon />}
          onClick={() => auth?.signIn()}
        >
          Sign in with google
        </Button>
        <Button
          variant="outlined"
          sx={{ marginTop: "2em" }}
          onClick={() => auth?.signInAnonymous()}
        >
          Sign in as anonymous guest
        </Button>
        <Typography variant="caption">
          You will not be able to edit anything as anonymous guest, just view
          LFG posts
        </Typography>
      </Paper>
    </Box>
  );
}
