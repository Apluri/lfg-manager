import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Character, ClassNames } from "../../utils/CharacterUtils";

export type LfgPost = {
  title: string;
  startTime: Date;
  ownerId: string;
  players: Character[];
};
export function LfgPosts() {
  const [lfgPosts, setLfgPosts] = useState<LfgPost[]>([
    {
      title: "Cute argos p3",
      startTime: new Date(),
      ownerId: "testiid",
      players: [
        {
          id: "aa",
          character: ClassNames.SHARPSHOOTER,
          charName: "Tertsi",
          itemLevel: 1400,
        },
        {
          id: "aa",
          character: ClassNames.SHARPSHOOTER,
          charName: "Tertsi2",
          itemLevel: 1400,
        },
        {
          id: "aa",
          character: ClassNames.SHARPSHOOTER,
          charName: "Terts3",
          itemLevel: 1400,
        },
        {
          id: "aa",
          character: ClassNames.SHARPSHOOTER,
          charName: "Terts4",
          itemLevel: 1400,
        },
        {
          id: "aa",
          character: ClassNames.SHARPSHOOTER,
          charName: "Tertsi",
          itemLevel: 1400,
        },
        {
          id: "aa",
          character: ClassNames.SHARPSHOOTER,
          charName: "Tertsi2",
          itemLevel: 1400,
        },
        {
          id: "aa",
          character: ClassNames.SHARPSHOOTER,
          charName: "Terts3",
          itemLevel: 1400,
        },
        {
          id: "aa",
          character: ClassNames.SHARPSHOOTER,
          charName: "Terts4",
          itemLevel: 1400,
        },
      ],
    },
    {
      title: "toka",
      startTime: new Date(),
      ownerId: "testid2",
      players: [
        {
          id: "aa",
          character: ClassNames.SHARPSHOOTER,
          charName: "Tertsi2",
          itemLevel: 1300,
        },
      ],
    },
  ]);
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        width: "100%",
      }}
    >
      {lfgPosts.map((post) => {
        return (
          <Paper sx={styles.postContainer}>
            <Box sx={styles.topRow}>
              <Box>
                <Typography>{post.title}</Typography>
                <Typography variant="caption">
                  {"Date " + post.startTime.toLocaleDateString("fi")}
                  {" Start time " + post.startTime.toLocaleTimeString("fi")}
                </Typography>
              </Box>
              <Typography>Post owner: {post.ownerId}</Typography>
              <IconButton onClick={() => {}} aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            </Box>
            <Box sx={styles.partyContainer}>
              {post.players.map((player) => {
                return (
                  <Paper elevation={8} sx={styles.playerCard}>
                    <Typography>{`${player.charName} ${player.character} ${player.itemLevel}`}</Typography>
                  </Paper>
                );
              })}
            </Box>
          </Paper>
        );
      })}
    </Box>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  postContainer: {
    display: "flex",
    flexDirection: "column",
    margin: "10px",
    padding: "10px",
    flex: 1,
  },
  topRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flex: 1,
  },
  partyContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
  },
  playerCard: {
    padding: "10px",
    marginTop: "1em",
  },
};
