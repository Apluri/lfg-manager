import { Alert, Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { LostArkRaidNames } from "../../utils/RaidUtils";
import { CreateLfgPost } from "../LFG/CreateLfgPost";
import { LfgFilterButtons } from "../LFG/LfgFilterButtons";
import { LfgPost, LfgPosts } from "../LFG/LfgPosts";
import { useAuth } from "../providers/AuthContext";
import { Roles, useDatabase } from "../providers/DatabaseContext";
import "./LfgScreen.css";

type Props = {
  style?: React.CSSProperties;
};
export function LfgScreen({ style }: Props) {
  const auth = useAuth();
  const db = useDatabase();
  const [lfgFilters, setLfgFilters] = useState<LostArkRaidNames[]>([]);
  const [createLfgPostVisible, setCreateLfgPostVisible] =
    useState<boolean>(false);
  function toggleFilter(raid: LostArkRaidNames) {
    const raidExistInFilter = lfgFilters.find((r) => r === raid);
    if (raidExistInFilter) {
      setLfgFilters(lfgFilters.filter((r) => r !== raid));
    } else {
      setLfgFilters([...lfgFilters, raid]);
    }
  }
  function isDisabledForCurrentUser(): boolean {
    return auth?.currentUser?.isAnonymous || db?.user?.role === Roles.QUEST;
  }

  return (
    <Box
      className="sceenContainer"
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        ...style,
      }}
    >
      <Box
        className="top-container"
        sx={{ minHeight: isDisabledForCurrentUser() ? "200px" : "150px" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6">LFG</Typography>
          <LfgFilterButtons
            lfgFilters={lfgFilters}
            toggleFilter={toggleFilter}
          />
          <Button
            onClick={() => setCreateLfgPostVisible(true)}
            disabled={isDisabledForCurrentUser()}
          >
            Create lfg post
          </Button>

          <CreateLfgPost
            visible={createLfgPostVisible}
            handleClose={() => setCreateLfgPostVisible(false)}
            handleAddNewPost={(post: LfgPost) => db?.addLfgPost(post)}
          />
        </Box>
        {isDisabledForCurrentUser() && (
          <Alert severity="warning">
            {auth?.currentUser?.isAnonymous
              ? "Editing content disabled for anonymous users, please create user if you wish to use the application"
              : "No permissions to edit or join LFG posts, contact Cute Guild admins to get permissions"}
          </Alert>
        )}
      </Box>

      <LfgPosts lfgFilters={lfgFilters} />
    </Box>
  );
}
