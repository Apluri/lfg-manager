import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Modal,
  Paper,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { DateTimePicker } from "@mui/x-date-pickers";
import React, { useEffect, useState } from "react";
import { ClassNames } from "../../utils/CharacterUtils";
import { useAuth } from "../providers/AuthContext";
import { LfgPost } from "./LfgPosts";
import { v4 as uuidv4 } from "uuid";
import { DateTime } from "luxon";
import { getLostArkRaidsList, LostArkRaids, Raid } from "../../utils/RaidUtils";

const MAX_TITLE_LENGTH = 60;
const TYPICAL_RAID_SIZE = 8;
type Props = {
  handleAddNewPost?: (post: LfgPost) => void;
  visible: boolean;
  handleClose: () => void;
  editExistingPost?: LfgPost;
  handleEditExistingPost?: (post: LfgPost) => void;
};
export function CreateLfgPost({
  visible,
  handleAddNewPost,
  handleClose,
  handleEditExistingPost,
  editExistingPost,
}: Props) {
  const [title, setTitle] = useState<string>("");
  const [titleHelper, setTitleHelper] = useState<string>("");

  const [maxApplicants, setMaxApplicants] = useState(TYPICAL_RAID_SIZE);

  const [selectedRaid, setSelectedRaid] = useState<Raid | null>(null);
  const [raidHelper, setRaidHelper] = useState<string>("");

  const [startTime, setStartTime] = useState<Date>(new Date());
  const [timeHelper, setTimeHelper] = useState<string>("");

  const [repeat, setRepeat] = useState<boolean>(false);
  const [error, setError] = useState(false);

  const auth = useAuth();
  const allowedMinuteDifference = 10;
  useEffect(() => {
    if (editExistingPost !== undefined) {
      setTitle(editExistingPost.title);
      setStartTime(new Date(editExistingPost.startTime));
      setSelectedRaid(editExistingPost.raid);
      setRepeat(editExistingPost.repeat);
    }
  }, [editExistingPost, handleClose]);

  function isInputsValid() {
    const isTitleValid = validateTitle();
    const isRaidSelectionValid = validateRaidSelection();
    const isTimeValid = validateTime();
    if (isTitleValid && isRaidSelectionValid && isTimeValid) {
      setError(false);
      return true;
    } else {
      setError(true);
      return false;
    }
  }

  function clearHelperTexts() {
    setRaidHelper("");
    setTimeHelper("");
    setTitleHelper("");
  }

  function validateTitle(): boolean {
    const longestAllowedWordSize = 45;
    const words = title.split(" ");
    const tooLongWord = words.find(
      (word) => word.length > longestAllowedWordSize
    );

    if (title.length === 0) {
      setTitleHelper("Title must be longer than 0 characters");

      return false;
    } else if (title.length > MAX_TITLE_LENGTH) {
      setTitleHelper(
        "Title cant be over " + MAX_TITLE_LENGTH + " characters long"
      );

      return false;
    } else if (tooLongWord !== undefined) {
      setTitleHelper(
        "Title contains too long words, max word length is " +
          longestAllowedWordSize
      );

      return false;
    } else {
      setTitleHelper("");
      return true;
    }
  }
  function validateRaidSelection(): boolean {
    if (selectedRaid === null) {
      setRaidHelper("Select raid");
    } else {
      setRaidHelper("");
    }
    return selectedRaid != null;
  }
  function validateTime() {
    const time = DateTime.fromISO(startTime.toJSON());
    const diff = time.diffNow("minutes").minutes;
    if (diff <= -allowedMinuteDifference) {
      setTimeHelper("No past times pls");
      return false;
    } else {
      setTimeHelper("");
      return true;
    }
  }
  function createNewPost(): LfgPost | null {
    if (auth?.currentUser?.uid === undefined) return null;
    if (selectedRaid === null) return null;
    const post: LfgPost = {
      title,
      raid: selectedRaid,
      startTime: startTime?.toJSON(),
      ownerId: editExistingPost?.ownerId ?? auth.currentUser.uid,
      lfgId: editExistingPost?.lfgId ?? uuidv4(),
      applicants: editExistingPost?.applicants ?? [],
      creationTime: new Date().toJSON(),
      repeat: repeat,
    };
    return post;
  }
  function clearState() {
    setStartTime(new Date());
    setTitle("");
    setSelectedRaid(null);
    setError(false);
    clearHelperTexts();
  }

  function handleChangeMaxApplicants(value: number | number[]) {
    if (typeof value === "number") {
      setMaxApplicants(value);
    }
  }
  function handleChangeRaid(value: LostArkRaids | null) {
    let newRaidValue: Raid | null = null;
    if (value) {
      newRaidValue =
        getLostArkRaidsList().find((item) => item.name === value) ?? null;
    }
    setSelectedRaid(newRaidValue);
  }

  return (
    <Modal
      open={visible}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={styles.modal}
    >
      <Paper sx={styles.container}>
        <Box>
          <Box sx={styles.row}>
            <TextField
              fullWidth
              error={error && titleHelper.length > 0}
              label="Title"
              helperText={titleHelper}
              value={title}
              variant="standard"
              required={true}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Box>
          {/**
           * 
           *      <Box sx={{ ...styles.row, alignItems: "center" }}>
            <Typography sx={{ minWidth: 90 }} variant="caption">
              Max players
            </Typography>
            <Slider
              aria-label="maxPlayersSlider"
              defaultValue={TYPICAL_RAID_SIZE}
              onChangeCommitted={(event, value) =>
                handleChangeMaxApplicants(value)
              }
              min={4}
              max={16}
              step={4}
              marks
              valueLabelDisplay="on"
            />
          </Box>
           */}

          <Box sx={{ ...styles.row, alignItems: "center" }}>
            <Autocomplete
              options={getLostArkRaidsList().map((raid) => raid.name)}
              onChange={(event, value) => handleChangeRaid(value)}
              value={selectedRaid?.name}
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Raid"
                  error={error && raidHelper.length > 0}
                  helperText={raidHelper}
                />
              )}
            />
          </Box>
          <Box sx={styles.row}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={repeat}
                    onChange={(event) => setRepeat(event.target.checked)}
                  />
                }
                label="Repeat automatically"
              />
            </FormGroup>
          </Box>

          <DateTimePicker
            renderInput={(props) => (
              <TextField
                {...props}
                sx={styles.itemsMargin}
                error={error && timeHelper.length > 0}
                helperText={timeHelper}
              />
            )}
            label="Date and start time"
            value={startTime}
            onChange={(newValue) => {
              if (newValue) setStartTime(newValue);
            }}
          />
        </Box>
        <Box sx={styles.actionButtons}>
          <Button
            onClick={() => {
              clearState();
              handleClose();
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (isInputsValid()) {
                const newPost = createNewPost();
                if (!newPost) return;
                if (handleAddNewPost !== undefined) {
                  handleAddNewPost(newPost);
                } else if (handleEditExistingPost !== undefined) {
                  handleEditExistingPost(newPost);
                }
                clearState();
                handleClose();
              }
            }}
          >
            {editExistingPost ? "Confirm" : "Add"}
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
    marginBottom: "2em",
  },
  actionButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    marginBottom: "2em",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "2em",
  },
};
