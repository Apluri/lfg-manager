import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
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
        Authenticate in order to view guild content
      </Typography>

      <Button
        variant="outlined"
        sx={{ marginTop: "2em" }}
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
        Sign in as anonymous quest
      </Button>
      <Typography variant="caption">
        You will not be able to edit anything with anonymous quest, just view
        LFG posts
      </Typography>
    </Box>
  );
}
