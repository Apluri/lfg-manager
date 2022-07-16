import { Box } from "@mui/system";
import { PageIntro } from "./PageIntro";
import { FeatureIntro } from "./FeatureIntro";
import { FuturePlansIntro } from "./FuturePlansIntro";

export function Login() {
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
      </Box>
    </Box>
  );
}
