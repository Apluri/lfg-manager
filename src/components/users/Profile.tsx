import { Alert, Button, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Character } from "../../utils/CharacterUtils";
import { CharacterCard } from "../classes/CharacterCard";
import { CreateCharacterModal } from "../classes/CreateCharacterModal";
import { useAuth } from "../providers/AuthContext";
import { useDatabase, Roles } from "../providers/DatabaseContext";
import { EditUserName } from "./EditUserName";
import { ProfileInfo } from "./ProfileInfo";

type Props = {
  style?: React.CSSProperties;
  stackMinWidth?: number;
};

export function Profile({ style, stackMinWidth }: Props) {
  const db = useDatabase();
  const auth = useAuth();
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
  function isQuest(): boolean {
    return db?.user?.role === Roles.QUEST;
  }

  if (auth?.currentUser?.isAnonymous)
    return (
      <Box sx={{ ...styles.container, ...style }}>
        <Box className="top-container" sx={{ minHeight: "200px" }}>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">PROFILE</Typography>
          </Box>
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
      <Box
        className="top-container"
        sx={{ minHeight: isQuest() ? "200px" : "150px" }}
      >
        <Box sx={styles.userInfoContainer}>
          <EditUserName
            visible={editUserName}
            oldName={db?.user?.userName}
            onClose={(newUserName) => handleEditUserName(newUserName)}
            onCancel={() => {
              setEditUserName(false);
            }}
          />
          <Typography variant="h6">PROFILE</Typography>

          <ProfileInfo user={db?.user} />
          <Button onClick={openModal}>Add character</Button>
        </Box>
        {auth?.currentUser?.isAnonymous && (
          <Alert severity="warning" sx={{ alignSelf: "flex-end" }}>
            Only non anonymous users can view and edit profile
          </Alert>
        )}
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
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  rowContainer: {},
  text: {
    fontSize: 20,
  },
};
