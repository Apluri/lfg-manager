import {
  Autocomplete,
  Avatar,
  Button,
  Modal,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Character, classIcons } from "../../utils/CharacterUtils";
import { useDatabase } from "../providers/DatabaseContext";

export type Props = {
  handleClose: () => void;
  visible: boolean;
  onJoin: (char: Character) => void;
  characters: Character[];
};
export function JoinLfg({ visible, onJoin, handleClose, characters }: Props) {
  const db = useDatabase();
  const [selectedClass, setSelectedClass] = useState<Character | null>(null);

  useEffect(() => {
    if (characters) {
      setSelectedClass(null);
    }
  }, [characters]);

  function getOwner(char: Character): string {
    const allUsers = db?.allUsers;
    if (!allUsers) return "Error finding owner";

    for (const key in allUsers) {
      const charExistInUser = allUsers[key].characters?.find(
        (c) => c.id === char.id
      );
      if (charExistInUser) {
        return allUsers[key].userName;
      }
    }
    return "Error finding owner";
  }

  type Option = {
    owner: string;
    char: Character;
  };
  const options: Option[] = characters
    .map((char) => {
      const owner = getOwner(char);
      return {
        owner,
        char,
      };
    })
    .sort((a, b) => -b.owner[0].localeCompare(a.owner[0]));

  function getIconSrc(char: Character) {
    console.log(char.charName);
    return classIcons[char.character];
  }
  function handleSelection(char: Character | null) {
    setSelectedClass(char);
  }

  if (!characters) <></>;
  return (
    <Modal open={visible} onClose={handleClose} sx={styles.modal}>
      <Paper sx={styles.container}>
        <Typography> Select character you wish to join party with</Typography>

        <Autocomplete
          options={options}
          groupBy={(option) => option.owner}
          getOptionLabel={(option) =>
            `${option.char.charName} ${option.char.itemLevel} `
          }
          filterOptions={(options, state) => {
            let newOptions: Option[] = [];
            options.forEach((option) => {
              if (
                option.char.charName
                  .toLowerCase()
                  .includes(state.inputValue.toLowerCase()) ||
                option.owner
                  .toLowerCase()
                  .includes(state.inputValue.toLowerCase())
              )
                newOptions.push(option);
            });
            return newOptions;
          }}
          renderOption={(props, option) => (
            <Box {...props} component="li">
              <Avatar
                src={getIconSrc(option.char)}
                sx={{ width: 30, height: 30 }}
              />
              <Typography
                sx={{ marginLeft: "5px" }}
              >{`${option.char.charName} ${option.char.itemLevel}`}</Typography>
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
                startAdornment: selectedClass && (
                  <Avatar src={getIconSrc(selectedClass)} />
                ),
              }}
              label={"Search characters"}
            />
          )}
          isOptionEqualToValue={(option, val) => option.char.id == val.char.id}
          onChange={(event, value) => handleSelection(value?.char ?? null)}
        />
        <Box sx={styles.actionButtons}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => selectedClass && onJoin(selectedClass)}>
            Confrim
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
}
const styles: { [key: string]: React.CSSProperties } = {
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "5em",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "1em",
    justifyContent: "space-between",
  },
  itemsMargin: {
    marginBottom: "3em",
  },
  actionButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
};
