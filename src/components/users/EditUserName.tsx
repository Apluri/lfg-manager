import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Button, Modal, Paper, TextField } from "@mui/material";

type Props = {
  visible: boolean;
  onClose: (newUserName: string) => void;
  onCancel: () => void;
  oldName?: string;
};
export function EditUserName({ visible, onClose, onCancel, oldName }: Props) {
  const [userName, setUserName] = useState<string>(oldName || "");
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (!visible) clearState();
    if (visible && oldName) setUserName(oldName);
  }, [visible]);
  function handleClose() {
    if (userName.length === 0) {
      setError(true);
      return;
    }
    onClose(userName);
  }
  function handleCancel() {
    if (oldName) {
      onCancel();
      return;
    }
    setError(true);
    return;
  }
  function clearState() {
    setError(false);
    setUserName("");
  }
  return (
    <Modal open={visible} onClose={handleCancel} sx={styles.modal}>
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
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleClose}>Ok</Button>
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
