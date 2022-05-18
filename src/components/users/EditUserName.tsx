import React, { useState } from "react";
import { Box } from "@mui/system";
import { Button, Modal, Paper, TextField } from "@mui/material";

type Props = {
  visible: boolean;
  onClose: (newUserName: string) => void;
  onCancel: () => void;
};
export function EditUserName({ visible, onClose, onCancel }: Props) {
  const [userName, setUserName] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  function handleClose() {
    setError(false);
    if (userName.length === 0) {
      setError(true);
      return;
    }
    onClose(userName);
  }
  return (
    <Modal open={visible} onClose={handleClose} sx={styles.modal}>
      <Paper sx={styles.container}>
        <TextField
          variant="standard"
          error={error && userName.length === 0}
          required={true}
          label="Username"
          value={userName}
          helperText={error ? "You must give username" : null}
          onChange={(e) => setUserName(e.target.value)}
        />
        <Box sx={styles.actionButtons}>
          <Button onClick={() => onCancel()}>Cancel</Button>
          <Button onClick={() => handleClose()}>Ok</Button>
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
  actionButtons: {
    marginTop: "10px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
};
