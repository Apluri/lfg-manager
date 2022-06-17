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
        flex: 1,
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: 700,
        }}
      >
        <Paper sx={{ padding: "2em" }}>
          <Typography variant="h4">
            Welcome to the official Cute Guild web application
          </Typography>
          <Typography sx={{ paddingTop: "1em" }}>
            This application is created for managing guild content for Lost Ark
            game.
          </Typography>
          <Typography sx={{ paddingTop: "1em" }}>
            Core features include: manage raid times, manage raid members,
            manage roster.
          </Typography>

          <Typography sx={{ paddingTop: "1em" }}>
            Future plans: add calendar view for raids, add raid categories for
            easy filtering, add raid party management, add discord login with
            discord notifications.
          </Typography>
        </Paper>

        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "2em",
            marginTop: "2em",
          }}
        >
          <Typography variant="h4" sx={{ marginBottom: "1em" }}>
            Authentication required to view content
          </Typography>
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
    </Box>
  );
}
