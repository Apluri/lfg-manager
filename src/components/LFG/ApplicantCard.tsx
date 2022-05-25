import React from "react";
import { Box } from "@mui/system";
import { Applicant, LfgPost } from "./LfgPosts";
import { Avatar, IconButton, Paper, Typography, useTheme } from "@mui/material";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { classIcons } from "../../utils/CharacterUtils";
import { useAuth } from "../providers/AuthContext";
import { useDatabase } from "../providers/DatabaseContext";
type Props = {
  applicant: Applicant;
  handleLeaveRaid: (applicant: Applicant) => void;
  post: LfgPost;
};
export function ApplicantCard({ applicant, handleLeaveRaid, post }: Props) {
  const auth = useAuth();
  const db = useDatabase();
  const themeColors = useTheme().palette;
  function isRemoveAllowed() {
    if (db?.user?.role === "admin") return true;
    if (auth?.currentUser?.uid === post.ownerId) return true;
    return auth?.currentUser?.uid === applicant.uid ?? false;
  }
  function getUserName() {
    const users = db?.allUsers;
    if (users && users[applicant.uid]) return users[applicant.uid].userName;
    else return "No name found";
  }

  return (
    <Paper
      elevation={6}
      sx={{
        display: "flex",
        flex: 1,
        padding: "10px",
        marginTop: "1em",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box sx={styles.charInfo}>
        <Avatar
          src={classIcons[applicant.character.character]}
          sx={{ marginRight: "10px" }}
        />
        <Box sx={styles.column}>
          <Box sx={styles.row}>
            <Typography sx={{}}>{getUserName()}</Typography>
            <Typography
              sx={{
                fontSize: 12,
                color: themeColors.grey[400],
                marginLeft: "5px",
              }}
            >
              {applicant.character.charName}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption">
              {applicant.character.character}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontSize: 12,
                color: themeColors.grey[400],
                marginLeft: "5px",
              }}
            >
              {applicant.character.itemLevel}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box>
        <IconButton
          disabled={!isRemoveAllowed()}
          onClick={() => handleLeaveRaid(applicant)}
        >
          <PersonRemoveIcon />
        </IconButton>
      </Box>
    </Paper>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  caption: {},
  charInfo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  column: {
    display: "flex",
    flexDirection: "column",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
};
