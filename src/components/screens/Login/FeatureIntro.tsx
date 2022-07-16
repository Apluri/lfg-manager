import { Paper, Typography, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import Valtan from "../../../assets/images/dashboard.jpg";

export function FeatureIntro() {
  const isMobile = useMediaQuery("(max-width:768px)");
  const isTablet = useMediaQuery("(max-width:1000px)");

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: isTablet ? "column" : "row",
        padding: "2em",
      }}
    >
      {!isMobile && (
        <Box
          sx={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            order: isTablet ? 2 : 1,
          }}
        >
          <img src={Valtan} style={{ maxWidth: "90%", height: "auto" }} />
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          order: 1,
        }}
      >
        <Box>
          <Typography variant="h2">Core features</Typography>

          <ul>
            <li>
              <Typography>Create / edit raid LFG</Typography>
            </li>
            <li>
              <Typography>Join / leave raid LFG</Typography>
            </li>
            <li>
              <Typography>Create / edit your characters</Typography>
            </li>
            <li>
              <Typography>
                <span style={{ fontWeight: "bold" }}>
                  Admin / LFG post owner
                </span>{" "}
                edit raid applicants
              </Typography>
            </li>
            <li>
              <Typography>
                <span style={{ fontWeight: "bold" }}>Admin</span> edit user
                permissions
              </Typography>
            </li>
          </ul>
        </Box>
      </Box>
    </Paper>
  );
}
