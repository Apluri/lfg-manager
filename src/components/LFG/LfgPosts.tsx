import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Character, ClassNames } from "../../utils/CharacterUtils";
import { useAuth } from "../providers/AuthContext";
import { useDatabase, UserData } from "../providers/DatabaseContext";
import { CreateLfgPost } from "./CreateLfgPost";
import { JoinLfg } from "./JoinLfg";
import { RaidList } from "./RaidList";

export type Applicant = {
  uid: string;
  character: Character;
};
export type LfgPost = {
  title: string;
  startTime: string;
  ownerId: string;
  lfgId: string;
  applicants?: Applicant[];
};
export function LfgPosts() {
  const auth = useAuth();
  const db = useDatabase();
  const [createLfgPostVisible, setCreateLfgPostVisible] =
    useState<boolean>(false);
  const [joinLfgVisible, setJoinLfgVisible] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const functionMenuVisible = Boolean(anchorEl);

  const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  function getPostOwnerName(post: LfgPost): string {
    if (db?.allUsers !== null) {
      const owner: UserData = db?.allUsers[post.ownerId];
      if (owner) {
        return owner.userName;
      }
    }

    return "No name found";
  }

  function handleAddNewPost(post: LfgPost) {
    db?.addLfgPost(post);
  }

  function handleJoinParty() {
    if (db?.user?.characters !== undefined) {
      setJoinLfgVisible(true);
    } else {
      displayNoCharacterError();
    }
  }
  function displayNoCharacterError() {
    alert("You dont have characters");
  }

  function handleDeleteLfg(post: LfgPost) {
    db?.deleteLfgPost(post);
    handleCloseMenu();
  }
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Button onClick={() => setCreateLfgPostVisible(true)}>
        Add lfg post
      </Button>
      <CreateLfgPost
        visible={createLfgPostVisible}
        handleClose={() => setCreateLfgPostVisible(false)}
        handleAddNewPost={handleAddNewPost}
      />
      {db?.lfgPosts?.map((post, index) => {
        return (
          <Paper key={index} sx={styles.postContainer}>
            <Box sx={styles.topRow}>
              <Box>
                <Typography>{post.title}</Typography>
                <Typography variant="caption">
                  {"Date " + new Date(post.startTime).toLocaleDateString("fi")}
                  {" Start time " +
                    new Date(post.startTime).toLocaleTimeString("fi")}
                </Typography>
              </Box>
              <Typography>Post owner: {getPostOwnerName(post)}</Typography>
              <IconButton onClick={handleClickMenu} aria-label="settings">
                <MoreVertIcon />
              </IconButton>
              <Menu
                open={functionMenuVisible}
                onClose={handleCloseMenu}
                anchorEl={anchorEl}
              >
                <MenuItem onClick={() => console.log("edit lfg")}>
                  Edit
                </MenuItem>
                <MenuItem onClick={() => handleDeleteLfg(post)}>
                  Delete
                </MenuItem>
              </Menu>
            </Box>
            <RaidList applicants={post.applicants} raidSize={8} />
            <Button onClick={handleJoinParty}>Join party</Button>

            {db.user?.characters !== undefined && (
              <JoinLfg
                visible={joinLfgVisible}
                onJoin={(char) => {}}
                handleClose={() => setJoinLfgVisible(false)}
                characters={db.user?.characters}
              />
            )}
          </Paper>
        );
      })}
    </Box>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  postContainer: {
    display: "flex",
    flexDirection: "column",
    margin: "10px",
    padding: "10px",
    flex: 1,
  },
  topRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flex: 1,
  },
  partyContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
  },
  playerCard: {
    padding: "10px",
    marginTop: "1em",
  },
};
