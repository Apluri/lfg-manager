import { Avatar, Paper, Typography, Card } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Character } from "../../utils/CharacterUtils";
import berserkerIcon from "../../assets/images/classIcons/berserker.png";

type Props = {
  character: Character;
  containerStyles?: React.CSSProperties;
};
export function CharacterCard({ character, containerStyles }: Props) {
  return (
    <Paper sx={{ ...styles.container, ...containerStyles }} elevation={1}>
      <Box sx={styles.row}>
        <Avatar src={berserkerIcon} />
        <Box sx={styles.column}>
          <Typography>{character.charName}</Typography>
          <Typography>{character.itemLevel}</Typography>
        </Box>
      </Box>
    </Paper>
  );
}
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "1em",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  column: {
    display: "flex",
    flexDirection: "column",
  },
};
