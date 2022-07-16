import { Alert, Button, Stack, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Character, ClassNames } from "../../utils/CharacterUtils";
import { CharacterCard } from "../classes/CharacterCard";
import { CreateCharacterModal } from "../classes/CreateCharacterModal";
import { useAuth } from "../providers/AuthContext";
import { UserData, useDatabase } from "../providers/DatabaseContext";
import { EditUserName } from "./EditUserName";
import { ProfileInfo } from "./ProfileInfo";

type Props = {
  style?: React.CSSProperties;
  stackMinWidth?: number;
};

export function Profile({ style, stackMinWidth }: Props) {
  const db = useDatabase();
  const auth = useAuth();
  const themeColors = useTheme().palette;
  const [editUserName, setEditUserName] = useState<boolean>(false);
  const [addCharacterVisible, setAddCharacterVisible] =
    useState<boolean>(false);

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
    db?.deleteCharacter(charToDelete);
  }
  function handleEditUserName(newUserName: string): void {
    db?.editUserName(newUserName);
    setEditUserName(false);
  }

  if (auth?.currentUser?.isAnonymous)
    return (
      <Box sx={{ ...styles.container, ...style }}>
        <Box className="top-container">
          <Typography variant="h6">Profile</Typography>

          <Button disabled={true}> Add character</Button>
          <Alert severity="warning">
            Only non anonymous users can view and edit profile
          </Alert>
        </Box>
      </Box>
    );
  return (
    <Box
      sx={{
        ...styles.container,
        ...style,
      }}
    >
      <Box className="top-container">
        <Box sx={styles.userInfoContainer}>
          <EditUserName
            visible={editUserName}
            oldName={db?.user?.userName}
            onClose={(newUserName) => handleEditUserName(newUserName)}
            onCancel={() => {
              setEditUserName(false);
            }}
          />

          <ProfileInfo onClick={() => setEditUserName(true)} />
        </Box>
        <Button onClick={openModal}>Add character</Button>
        <CreateCharacterModal
          visible={addCharacterVisible}
          handleClose={closeModal}
          handleAddCharacter={handleAddCharacter}
        />
      </Box>
      <Stack
        spacing={2}
        sx={{ minWidth: stackMinWidth ?? "50%", marginBottom: "20px" }}
      >
        {db?.user?.characters?.map((character, index) => (
          <CharacterCard
            key={character.id}
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
