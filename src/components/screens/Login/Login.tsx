import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Paper } from "@mui/material";
import { useAuth } from "../../providers/AuthContext";
import GoogleIcon from "@mui/icons-material/Google";
import { PageIntro } from "./PageIntro";
import { FeatureIntro } from "./FeatureIntro";
import { FuturePlansIntro } from "./FuturePlansIntro";

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
        }}
      >
        <PageIntro />
        <FeatureIntro />
        <FuturePlansIntro />

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
