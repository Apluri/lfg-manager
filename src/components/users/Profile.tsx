import { Avatar, Button, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Character, ClassNames } from "../../utils/CharacterUtils";
import { CharacterCard } from "../classes/CharacterCard";
import { CreateCharacterModal } from "../classes/CreateCharacterModal";
import { useAuth } from "../providers/AuthContext";
import { UserData, useDatabase } from "../providers/DatabaseContext";
import { EditUserName } from "./EditUserName";
import { ProfileInfo } from "./ProfileInfo";

type Props = {
  style?: React.CSSProperties;
};

export function Profile({ style }: Props) {
  const db = useDatabase();
  const auth = useAuth();
  const [editUserName, setEditUserName] = useState<boolean>(false);
  const [addCharacterVisible, setAddCharacterVisible] =
    useState<boolean>(false);
  const [characters, setCharacters] = useState<Character[]>([]);

  function closeModal(): void {
    setAddCharacterVisible(false);
  }
  function openModal(): void {
    setAddCharacterVisible(true);
  }
  function handleAddCharacter(newChar: Character): void {
    closeModal();
    db?.addCharacter(newChar);
  }
  function handleDelete(charToDelete: Character): void {
    setCharacters(
      characters.filter((char) => char.charName !== charToDelete.charName)
    );
  }
  function handleEditUserName(newUserName: string): void {
    const user = db?.user;
    if (
      user !== null &&
      user !== undefined &&
      auth?.currentUser?.uid !== undefined
    ) {
      const newUser: UserData = {
        ...user,
        userName: newUserName,
      };

      db?.editUser(newUser, auth.currentUser.uid);
      setEditUserName(false);
    }
  }
  return (
    <Box sx={{ ...styles.container, ...style }}>
      <Box sx={styles.userInfoContainer}>
        <EditUserName
          visible={editUserName}
          oldName={db?.user?.userName}
          onClose={(newUserName) => handleEditUserName(newUserName)}
          onCancel={() => {
            setEditUserName(false);
          }}
        />

        <ProfileInfo />
        <Button onClick={() => setEditUserName(true)}>edit</Button>
      </Box>
      <Button onClick={openModal}>Add character</Button>
      <CreateCharacterModal
        visible={addCharacterVisible}
        handleClose={closeModal}
        handleAddCharacter={handleAddCharacter}
      />
      <Stack spacing={2} sx={{ width: "100%" }}>
        {db?.user?.characters?.map((character, index) => (
          <CharacterCard
            key={index}
            character={character}
            handleDelete={handleDelete}
          />
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
