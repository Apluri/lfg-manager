import { Avatar, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Character } from "../../utils/CharacterUtils";
import { CharacterCard } from "../classes/CharacterCard";

type Props = {
  style?: React.CSSProperties;
};

export function Profile({ style }: Props) {
  const characters: Character[] = [
    { charName: "Shadowhunter", itemLevel: 1414 },
    { charName: "Deathblade", itemLevel: 1400 },
  ];
  return (
    <Box sx={{ ...styles.container, ...style }}>
      <Box sx={styles.userInfoContainer}>
        <Typography>Username</Typography>
        <Avatar />
      </Box>
      <Stack spacing={2} sx={{ width: "100%" }}>
        {characters.map((character, index) => (
          <CharacterCard key={index} character={character} />
        ))}
      </Stack>
    </Box>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "1em",
    width: "100%",
  },

  userInfoContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  rowContainer: {},
  text: {
    fontSize: 20,
  },
};
