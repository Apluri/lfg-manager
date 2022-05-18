import { Avatar, Button, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Character, ClassNames } from "../../utils/CharacterUtils";
import { CharacterCard } from "../classes/CharacterCard";
import { CreateCharacterModal } from "../classes/CreateCharacterModal";
import { CustomUser, useDatabase } from "../providers/DatabaseContext";
import { EditUserName } from "./EditUserName";
import { ProfileInfo } from "./ProfileInfo";

type Props = {
  style?: React.CSSProperties;
};

export function Profile({ style }: Props) {
  const db = useDatabase();
  const [editUserName, setEditUserName] = useState<boolean>(false);
  const [addCharacterVisible, setAddCharacterVisible] =
    useState<boolean>(false);
  const [characters, setCharacters] = useState<Character[]>([
    {
      charName: "Ayalup",
      character: ClassNames.ARTILLERIST,
      itemLevel: 1414,
    },
    {
      charName: "Aplyuri",
      character: ClassNames.DEATHBLADE,
      itemLevel: 1414,
    },
  ]);

  function closeModal(): void {
    setAddCharacterVisible(false);
  }
  function openModal(): void {
    setAddCharacterVisible(true);
  }
  function handleAddCharacter(newChar: Character): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      setCharacters([...characters, newChar]);
      closeModal();
      // add thingies to db and check if succesful?
      if (true) resolve();
      reject();
    });
  }
  function handleDelete(charToDelete: Character): void {
    setCharacters(
      characters.filter((char) => char.charName !== charToDelete.charName)
    );
  }
  return (
    <Box sx={{ ...styles.container, ...style }}>
      <Box sx={styles.userInfoContainer}>
        <EditUserName
          visible={editUserName}
          oldName={db?.user?.data?.userName}
          onClose={(newUserName) => {
            const user = db?.user;
            if (user !== null && user !== undefined) {
              const editedUser: CustomUser = {
                ...user,
                data: { ...user.data, userName: newUserName },
              };
              db?.editUser(editedUser);
              setEditUserName(false);
            }
          }}
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
        {characters.map((character, index) => (
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
