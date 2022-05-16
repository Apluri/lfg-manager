import { Avatar, Button, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Character } from "../../utils/CharacterUtils";
import { CharacterCard } from "../classes/CharacterCard";
import { CreateCharacterModal } from "../classes/CreateCharacterModal";

type Props = {
  style?: React.CSSProperties;
};

export function Profile({ style }: Props) {
  const [addCharacterVisible, setAddCharacterVisible] =
    useState<boolean>(false);
  const [characters, setCharacters] = useState<Character[]>([
    {
      charName: "Ayalup",
      character: "Shadowhunter",
      itemLevel: 1414,
      gearSet: "Preordained 5 set",
      engravings: [],
      gems: [],
    },
    {
      charName: "Aplyuri",
      character: "Deathblade",
      itemLevel: 1414,
      engravings: [{ name: "Adrenaline", level: 3 }],
      gearSet: "Harsh oath 5 set",
      gems: [
        { level: 5, type: "atk", skillName: "moonlight sonic" },
        { level: 5, type: "atk", skillName: "moonlight sonic" },
        { level: 5, type: "cdr", skillName: "moonlight sonic" },
      ],
    },
  ]);

  function closeModal(): void {
    setAddCharacterVisible(false);
  }
  function openModal(): void {
    setAddCharacterVisible(true);
  }
  function handleAddCharacter(newChar: Character) {
    console.log("character creation time");
    console.log(newChar);
    setCharacters([...characters, newChar]);
    closeModal();
  }
  return (
    <Box sx={{ ...styles.container, ...style }}>
      <Box sx={styles.userInfoContainer}>
        <Typography>Username</Typography>
        <Avatar />
      </Box>
      <Button onClick={openModal}>Add character</Button>
      <CreateCharacterModal
        visible={addCharacterVisible}
        handleClose={closeModal}
        handleAddCharacter={handleAddCharacter}
      />
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
