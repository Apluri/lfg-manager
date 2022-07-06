import {
  Autocomplete,
  Avatar,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import {
  Character,
  classIcons,
  ClassNames,
  getClassNameList,
} from "../../utils/CharacterUtils";
import { LfgPost } from "./LfgPosts";
import Select, { StylesConfig, Theme, ThemeConfig } from "react-select";
import { useDatabase } from "../providers/DatabaseContext";

export type Props = {
  handleClose: () => void;
  visible: boolean;
  onJoin: (char: Character) => void;
  characters: Character[];
};
export function JoinLfg({ visible, onJoin, handleClose, characters }: Props) {
  const db = useDatabase();
  const [selectedClass, setSelectedClass] = useState<Character>(characters[0]);
  const [charList, setCharList] = useState<Character[]>([...characters]);
  const themeColors = useTheme().palette;
  useEffect(() => {
    if (characters) {
      setSelectedClass(characters[0]);
      setCharList([...characters]);
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
  const options = characters
    .map((char) => {
      const owner = getOwner(char);
      return {
        owner,
        char,
      };
    })
    .sort((a, b) => -b.owner[0].localeCompare(a.owner[0]));

  function getIconSrc() {
    if (selectedClass) {
      return classIcons[selectedClass?.character];
    } else return classIcons.NoClassSelected;
  }
  function handleSelection(char: Character) {
    if (char !== undefined && char !== null) setSelectedClass(char);
  }

  function customTheme(theme: Theme) {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        danger: "#DE350B",
        dangerLight: "#FFBDAD",
        neutral90: "hsl(0, 0%, 100%)",
        neutral80: "hsl(0, 0%, 95%)",
        neutral70: "hsl(0, 0%, 90%)",
        neutral60: "hsl(0, 0%, 80%)",
        neutral50: "hsl(0, 0%, 70%)",
        neutral40: "hsl(0, 0%, 60%)",
        neutral30: "hsl(0, 0%, 50%)",
        neutral20: "hsl(0, 0%, 40%)",
        neutral10: "hsl(0, 0%, 30%)",
        neutral5: "hsl(0, 0%, 20%)",
        neutral0: themeColors.background.default,
        primary: themeColors.grey[500],
        primary75: themeColors.primary.dark,
        primary50: themeColors.primary.dark,
        primary25: themeColors.primary.dark,
      },
    };
  }
  if (!characters) <></>;
  return (
    <Modal open={visible} onClose={handleClose} sx={styles.modal}>
      <Paper sx={styles.container}>
        <Typography> Select character you wish to join party with</Typography>
        {/**
         *   <Select<Character>
          options={charList}
          value={selectedClass}
          theme={(theme) => theme && customTheme(theme)}
          name="Character"
          getOptionValue={(char: Character) => char.id}
          getOptionLabel={(char: Character) =>
            `${char.charName} ${char.itemLevel}`
          }
          isClearable={true}
          onChange={(char) => char && handleSelection(char)}
        />
         */}
        <Autocomplete
          options={options}
          groupBy={(option) => option.owner}
          getOptionLabel={(option) => option.char.charName}
          renderInput={(params) => (
            <TextField {...params} label={"Search characters"} />
          )}
          isOptionEqualToValue={(option, val) => option.char.id == val.char.id}
          onChange={(event, value) => value && handleSelection(value.char)}
        />
        <Box sx={styles.actionButtons}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => onJoin(selectedClass)}>Confrim</Button>
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
