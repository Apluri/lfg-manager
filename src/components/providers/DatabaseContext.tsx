import React, { useContext, useEffect, useState } from "react";
import { database } from "../../firebase";
import { ref, onValue, set } from "firebase/database";
import { useAuth } from "./AuthContext";
import { User } from "firebase/auth";
import { Character, ClassNames } from "../../utils/CharacterUtils";
import { Modal, Paper } from "@mui/material";
import { EditUserName } from "../users/EditUserName";
import { Applicant, LfgPost } from "../LFG/LfgPosts";

enum Paths {
  CHARACTERS = "characters/",
  USERNAME = "userName/",
  USERS = "users/",
  LFG_POSTS = "lfg/",
}

export enum Roles {
  ADMIN = "admin",
  MEMBER = "member",
  QUEST = "quest",
}
interface DatabaseContextInterface {
  user: UserData | null;
  allUsers: any;
  lfgPosts: LfgPost[] | null | undefined;
  editUser: (user: UserData, userId: string) => Promise<void>;
  addCharacter: (newChar: Character) => Promise<void>;
  deleteCharacter: (charToDelete: Character) => void;
  editUserName: (newUserName: string) => void;
  addLfgPost: (post: LfgPost) => void;
  deleteLfgPost: (post: LfgPost) => Promise<void>;
  joinLfg: (post: LfgPost, applicant: Applicant) => Promise<void>;
  leaveLfg: (post: LfgPost, applicant: Applicant) => void;
}

export type UserData = {
  userName: string;
  characters?: Character[];
  role: Roles;
};

function editUser(user: UserData, userId: string): Promise<void> {
  return set(ref(database, Paths.USERS + userId), user);
}
function editUserCustomDataAndPath(
  data: any,
  userId: string,
  path: string
): Promise<void> {
  return set(ref(database, Paths.USERS + userId + "/" + path), data);
}

function editPosts(posts: LfgPost[]): Promise<void> {
  return set(ref(database, Paths.LFG_POSTS), posts);
}
const DbContext = React.createContext<DatabaseContextInterface | null>(null);

export function useDatabase(): DatabaseContextInterface | null {
  return useContext(DbContext);
}

type Props = {
  children: React.ReactNode;
};
export function DatabaseProvider({ children }: Props) {
  const auth = useAuth();
  const [user, setUser] = useState<UserData | null>(null);
  const [allUsers, setAllUsers] = useState<any>(null);
  const [lfgPosts, setLfgPosts] = useState<LfgPost[] | null | undefined>();
  const [userNameModalVisible, setUserNameModalVisible] =
    useState<boolean>(false);

  function getUserData(uid: string): void {
    const t = ref(database, Paths.USERS + uid);
    onValue(t, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        console.log("no data found, probably user not created yet");
        // create new user by giving username
        setUserNameModalVisible(true);
        return;
      }
      setUser({
        userName: data.userName,
        characters: data.characters,
        role: data.role,
      });
    });
  }
  // once called, it will keep calling the callback on each data update
  function getData(path: string, callback: (data: any) => void) {
    const dbRef = ref(database, path);
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      callback(data);
    });
  }
  function getAllUsersData() {
    getData(Paths.USERS, (data) => setAllUsers(data));
  }
  function getLfgPosts() {
    getData(Paths.LFG_POSTS, (data) => setLfgPosts(data));
  }

  function applicantIsInLfg(post: LfgPost, applicant: Applicant) {
    const isInLfg = post.applicants?.find((a) => a.uid === applicant.uid);
    return isInLfg ? true : false;
  }

  function handleCreateUser(newUserName: string) {
    setUserNameModalVisible(false);
    if (auth?.currentUser != null) {
      const tempUser: UserData = {
        userName: newUserName,
        characters: [],
        role: Roles.QUEST,
      };
      editUser(tempUser, auth.currentUser.uid);
    }
  }
  useEffect(() => {
    if (auth?.currentUser != null) {
      getUserData(auth.currentUser.uid);
    } else {
      setUser(null);
    }
    getAllUsersData();
    getLfgPosts();
  }, [auth?.currentUser]);

  function addCharacter(newChar: Character): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      let newCharactersList: Character[] = [];
      if (user?.characters !== undefined) {
        newCharactersList = [...user.characters, newChar];
      } else {
        newCharactersList = [newChar];
      }
      if (auth?.currentUser?.uid !== undefined) {
        editUserCustomDataAndPath(
          newCharactersList,
          auth.currentUser.uid,
          Paths.CHARACTERS
        )
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        reject("could not create character, auth uid not defined");
      }
    });
  }
  function deleteCharacter(charToDelete: Character) {
    const newCharactersList = user?.characters?.filter(
      (char) => char.id !== charToDelete.id
    );
    if (
      auth?.currentUser?.uid !== undefined &&
      newCharactersList !== undefined
    ) {
      editUserCustomDataAndPath(
        newCharactersList,
        auth.currentUser.uid,
        Paths.CHARACTERS
      );
    }
  }
  function editUserName(newUserName: string) {
    if (auth?.currentUser?.uid) {
      editUserCustomDataAndPath(
        newUserName,
        auth.currentUser.uid,
        Paths.USERNAME
      );
    }
  }
  function addLfgPost(post: LfgPost) {
    if (lfgPosts) {
      const newPosts: LfgPost[] = [post, ...lfgPosts];
      editPosts(newPosts);
    } else {
      // this may delete all posts so check it later again
      editPosts([post]);
    }
  }
  function deleteLfgPost(post: LfgPost): Promise<void> {
    console.log(post.ownerId);
    console.log(auth?.currentUser?.uid);

    return new Promise((result, reject) => {
      if (
        post.ownerId === auth?.currentUser?.uid ||
        user?.role === Roles.ADMIN
      ) {
        if (lfgPosts) {
          console.log(lfgPosts);
          const newPosts: LfgPost[] = lfgPosts.filter(
            (p) => p.lfgId !== post.lfgId
          );

          editPosts(newPosts);
        }
        result();
      } else {
        reject("You are not allowed to delete this post");
      }
    });
  }
  function joinLfg(post: LfgPost, applicant: Applicant): Promise<void> {
    return new Promise((result, reject) => {
      if (!applicantIsInLfg(post, applicant)) {
        // change 8 into raidSize variable later on
        if (post.applicants && post?.applicants?.length >= 8) {
          reject("Raid is full");
          return;
        }
        const editedPosts = lfgPosts?.map((p) => {
          if (p.lfgId === post.lfgId) {
            let newApplicants: Applicant[] = [];
            if (p.applicants) newApplicants = [...p.applicants, applicant];
            else newApplicants = [applicant];
            return { ...p, applicants: newApplicants };
          } else {
            return p;
          }
        });

        if (editedPosts) {
          editPosts(editedPosts);
          result();
        }
      }
      const alreadyInWith = post.applicants?.find(
        (a) => a.uid === applicant.uid
      );
      reject(
        "Could not join the party, already in with " +
          alreadyInWith?.character.charName
      );
    });
  }
  function leaveLfg(post: LfgPost, applicant: Applicant) {
    if (!applicantIsInLfg(post, applicant)) return;

    const editedPosts = lfgPosts?.map((p) => {
      if (p.lfgId === post.lfgId) {
        return {
          ...p,
          applicants: p.applicants?.filter((a) => a.uid !== applicant.uid),
        };
      } else return p;
    });
    if (editedPosts) editPosts(editedPosts);
  }

  const value: DatabaseContextInterface = {
    user,
    allUsers,
    lfgPosts,
    editUser,
    addCharacter,
    deleteCharacter,
    editUserName,
    addLfgPost,
    deleteLfgPost,
    joinLfg,
    leaveLfg,
  };
  return (
    <DbContext.Provider value={value}>
      <EditUserName
        visible={userNameModalVisible}
        onClose={(newUserName) => handleCreateUser(newUserName)}
        onCancel={() => {
          console.log("canceled do nothing");
        }}
      />
      {children}
    </DbContext.Provider>
  );
}
