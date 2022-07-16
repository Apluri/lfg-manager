import { Button, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useAuth } from "../../providers/AuthContext";
import { Box } from "@mui/system";

export function LoginButtons() {
  const auth = useAuth();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "2em",
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
        You will not be able to edit anything as anonymous guest, just view LFG
        posts
      </Typography>
    </Box>
  );
}
