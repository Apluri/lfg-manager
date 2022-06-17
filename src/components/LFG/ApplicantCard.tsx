import React, { useState } from "react";
import { Box } from "@mui/system";
import { Applicant, LfgPost } from "./LfgPosts";
import {
  Alert,
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  Snackbar,
  Typography,
  useTheme,
} from "@mui/material";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { classIcons, ClassNames } from "../../utils/CharacterUtils";
import { useAuth } from "../providers/AuthContext";
import { useDatabase } from "../providers/DatabaseContext";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
type Props = {
  applicant: Applicant;
  handleLeaveRaid: (applicant: Applicant) => void;
  post: LfgPost;
};
export function ApplicantCard({ applicant, handleLeaveRaid, post }: Props) {
  const auth = useAuth();
  const db = useDatabase();

  const userRef = db?.allUsers ? db?.allUsers[applicant.uid] : undefined;
  const themeColors = useTheme().palette;

  const [snackOpen, setSnackOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  function isRemoveAllowed() {
    if (db?.user?.role === "admin") return true;
    if (auth?.currentUser?.uid === post.ownerId) return true;
    return auth?.currentUser?.uid === applicant.uid ?? false;
  }
  function getUserName() {
    if (userRef) return userRef.userName;
    else return "No name found";
  }
  function getCharName(): string {
    const charId = applicant.character.id;
    if (userRef) {
      return (
        userRef.characters?.find((char) => char.id === charId)?.charName ??
        "No charname found"
      );
    } else {
      return "No charname found";
    }
  }
  function getItemLevel() {
    const charId = applicant.character.id;
    if (userRef) {
      return userRef.characters?.find((char) => char.id === charId)?.itemLevel;
    } else {
      return "No itemlevel found";
    }
  }
  function getCharacter(): ClassNames {
    const charId = applicant.character.id;
    if (userRef) {
      return (
        userRef.characters?.find((char) => char.id === charId)?.character ??
        ClassNames.DEFAULT
      );
    } else {
      return ClassNames.DEFAULT;
    }
  }
  function handleCopyClick() {
    setSnackOpen(true);
    navigator.clipboard.writeText(getCharName());
  }
  return (
    <Paper
      className="applicantCard"
      elevation={6}
      sx={{
        justifyContent: "space-between",
      }}
    >
      <Snackbar
        open={snackOpen}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={2000}
        onClose={() => setSnackOpen(false)}
      >
        <Alert severity="info">{getCharName() + " copied to clipboard"}</Alert>
      </Snackbar>
      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
      >
        <DialogTitle>
          {"Are you sure you wish to leave " + post.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Leaving user: {getUserName()}</DialogContentText>
          <DialogContentText>character name: {getCharName()}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)}>Cancel</Button>
          <Button onClick={() => handleLeaveRaid(applicant)}>Confirm</Button>
        </DialogActions>
      </Dialog>
      <Box sx={styles.charInfo}>
        <Avatar src={classIcons[getCharacter()]} sx={{ marginRight: "10px" }} />
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
              {getCharName()}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption">{getCharacter()}</Typography>
            <Typography
              variant="caption"
              sx={{
                fontSize: 12,
                color: themeColors.grey[400],
                marginLeft: "5px",
              }}
            >
              {getItemLevel()}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box>
        <IconButton
          onClick={() => {
            handleCopyClick();
          }}
        >
          <ContentCopyIcon />
        </IconButton>
        <IconButton
          disabled={!isRemoveAllowed()}
          onClick={() => setConfirmDialogOpen(true)}
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
