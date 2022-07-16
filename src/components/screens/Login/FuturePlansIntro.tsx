import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import MemePlans from "../../../assets/images/memeplans.png";
import useMediaQuery from "@mui/material/useMediaQuery";

export function FuturePlansIntro() {
  const isMobile = useMediaQuery("(max-width:768px)");
  const isTablet = useMediaQuery("(max-width:1000px)");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isTablet ? "column" : "row",
        padding: "2em",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="h2">Future plans</Typography>

          <ul>
            <li>
              <Typography>Calendar view</Typography>
            </li>
            <li>
              <Typography>Discord login and notifications</Typography>
            </li>
            <li>
              <Typography>
                Join and edit LFG applicants with drag and drop
              </Typography>
            </li>
          </ul>
        </Box>
      </Box>
      {!isMobile && (
        <Box
          sx={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={MemePlans} style={{ maxWidth: "90%", height: "auto" }} />
        </Box>
      )}
    </Box>
  );
}
