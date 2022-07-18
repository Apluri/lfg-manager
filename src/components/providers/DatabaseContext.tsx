import React, { useContext, useEffect, useState } from "react";
import { database } from "../../firebase";
import { ref, onValue, set } from "firebase/database";
import { useAuth } from "./AuthContext";
import { User } from "firebase/auth";
import { Character, ClassNames } from "../../utils/CharacterUtils";
import { Modal, Paper } from "@mui/material";
import { EditUserName } from "../users/EditUserName";
import { Applicant, LfgPost } from "../LFG/LfgPosts";
import { DateTime } from "luxon";

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
  allUsers: Users | null | undefined;
  lfgPosts: LfgPost[] | null | undefined;
  editUser: (user: UserData, userId: string) => Promise<void>;
  addCharacter: (newChar: Character) => Promise<void>;
  editCharacter: (editChar: Character) => Promise<void>;
  deleteCharacter: (charToDelete: Character) => void;
  editUserName: (newUserName: string, targetUserId?: string) => void;
  addLfgPost: (post: LfgPost) => void;
  editLfgPost: (post: LfgPost) => Promise<void>;
  deleteLfgPost: (post: LfgPost) => Promise<void>;
  joinLfg: (post: LfgPost, applicant: Applicant) => Promise<void>;
  leaveLfg: (post: LfgPost, applicant: Applicant) => void;
  editRole: (newRole: Roles, userId: string) => Promise<void>;
}

export type Users = {
  [key: string]: UserData;
};
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
  const [allUsers, setAllUsers] = useState<Users | null | undefined>(null);
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
    // note, this wont be updated to database before somone does some change to any lfg post (could cause issues?)
    function filterOldPosts(posts: LfgPost[]): LfgPost[] {
      return posts.filter((post) => {
        // ignore filter if repeat is enabled
        if (post.repeat) return true;
        const postStartTime = DateTime.fromISO(post.startTime);
        const diff = postStartTime.diffNow("hours").hours;

        // delete 10 hour or older posts
        if (diff < -10) return false;
        return true;
      });
    }
    function updateRepeatLfgPosts(posts: LfgPost[]): LfgPost[] {
      return posts.map((post) => {
        if (post.repeat) {
          const postStartTime = DateTime.fromISO(post.startTime);
          const diff = postStartTime.diffNow("hours").hours;
          // update post after 30min from start time
          if (diff < -1) {
            const oldStartTime = new Date(post.startTime);
            const newStartTime = oldStartTime.setDate(
              oldStartTime.getDate() + 7
            );
            post.startTime = new Date(newStartTime).toJSON();
          }
        }
        return post;
      });
    }
    getData(Paths.LFG_POSTS, (data) => {
      const posts: LfgPost[] = data ?? [];
      // sort mainy by startime, if they are identical sort by creation time
      const sortedPosts = posts.sort((a, b) => {
        if (
          DateTime.fromISO(a.startTime).valueOf() >
          DateTime.fromISO(b.startTime).valueOf()
        ) {
          return 1;
        } else if (
          DateTime.fromISO(a.startTime).valueOf() ===
          DateTime.fromISO(b.startTime).valueOf()
        ) {
          return DateTime.fromISO(a.creationTime).valueOf() >
            DateTime.fromISO(b.creationTime).valueOf()
            ? 1
            : -1;
        } else {
          return -1;
        }
      });

      setLfgPosts(filterOldPosts(updateRepeatLfgPosts(sortedPosts)));
    });
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
    if (auth?.currentUser != null && !auth.currentUser.isAnonymous) {
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
  function editCharacter(editChar: Character): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (auth?.currentUser?.uid === undefined) {
        reject("Used need to be authenticated to edit characters");
        return;
      }
      if (user?.characters === undefined) {
        reject("Cant edit characters when user does not have them");
        return;
      }

      const editedCharacters = user?.characters?.map((char) =>
        char.id === editChar.id ? editChar : char
      );
      const editedUser: UserData = { ...user, characters: editedCharacters };

      editUser(editedUser, auth?.currentUser?.uid);
      resolve();
    });
  }

  function leaveFromLfgs(charId: string) {
    const editedPosts = lfgPosts?.map((post) => {
      const newApplicants: Applicant[] =
        post.applicants?.filter(
          (applicant) => applicant.character.id !== charId
        ) ?? [];
      const newPost: LfgPost = {
        ...post,
        applicants: newApplicants,
      };
      return newPost;
    });
    if (editedPosts !== undefined) {
      editPosts(editedPosts);
    }
  }
  function deleteCharacter(charToDelete: Character) {
    const newCharactersList = user?.characters?.filter(
      (char) => char.id !== charToDelete.id
    );
    if (
      auth?.currentUser?.uid !== undefined &&
      newCharactersList !== undefined
    ) {
      leaveFromLfgs(charToDelete.id);
      editUserCustomDataAndPath(
        newCharactersList,
        auth.currentUser.uid,
        Paths.CHARACTERS
      );
    }
  }
  function editUserName(newUserName: string, userId?: string) {
    function getUserId(): string | undefined {
      if (user?.role === Roles.ADMIN && userId) return userId;
      if (userId) return undefined;
      return auth?.currentUser?.uid;
    }

    const uid = getUserId();

    if (!uid) return;
    editUserCustomDataAndPath(newUserName, uid, Paths.USERNAME);
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
  function editLfgPost(post: LfgPost): Promise<void> {
    return new Promise((resolve, reject) => {
      if (
        !(post.ownerId === auth?.currentUser?.uid || user?.role === Roles.ADMIN)
      ) {
        reject("You are not authorized to edit this post");
        return;
      }

      if (!lfgPosts) {
        reject("There is no existing posts");
        return;
      }

      // all good lets edit post
      const newPosts: LfgPost[] = lfgPosts.map((p) =>
        p.lfgId === post.lfgId ? post : p
      );
      editPosts(newPosts);
      resolve();
    });
  }
  function deleteLfgPost(post: LfgPost): Promise<void> {
    return new Promise((resolve, reject) => {
      if (
        post.ownerId === auth?.currentUser?.uid ||
        user?.role === Roles.ADMIN
      ) {
        if (lfgPosts) {
          const newPosts: LfgPost[] = lfgPosts.filter(
            (p) => p.lfgId !== post.lfgId
          );

          editPosts(newPosts);
        }
        resolve();
      } else {
        reject("You are not allowed to delete this post");
      }
    });
  }
  function joinLfg(post: LfgPost, applicant: Applicant): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!applicantIsInLfg(post, applicant)) {
        // change 8 into raidSize variable later on
        if (
          post.applicants &&
          post?.applicants?.length >= post.raid.maxPlayers
        ) {
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
          editPosts(editedPosts)
            .then(() => resolve())
            .catch((e) =>
              reject(
                "No permissions to join or edit LFG, contact Cute Guild admins to get permissions"
              )
            );
          return;
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

  function isAllowedToEdit(post: LfgPost, applicant: Applicant): boolean {
    if (user?.role === Roles.ADMIN) return true;
    return applicant.uid === auth?.currentUser?.uid;
  }
  function leaveLfg(post: LfgPost, applicant: Applicant) {
    if (!applicantIsInLfg(post, applicant)) return;

    if (!isAllowedToEdit(post, applicant)) return;

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
  function editRole(newRole: Roles, userId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (
        allUsers === null ||
        allUsers === undefined ||
        auth?.currentUser?.uid === undefined
      ) {
        reject("Users undefined, unable to change roles");
        return;
      }
      if (auth.currentUser.isAnonymous) {
        reject("Anonymous users are not allowed to edit roles");
        return;
      }
      if (allUsers[auth?.currentUser?.uid].role !== Roles.ADMIN) {
        reject("Only admins are allowed to edit roles");
        return;
      }
      const user = allUsers[userId];
      if (user !== null && user !== undefined) {
        const editedUser = { ...user, role: newRole };
        editUser(editedUser, userId);
        resolve();
      } else {
        reject("no user found with id, unable to edit role");
      }
    });
  }

  const value: DatabaseContextInterface = {
    user,
    allUsers,
    lfgPosts,
    editUser,
    addCharacter,
    editCharacter,
    deleteCharacter,
    editUserName,
    addLfgPost,
    editLfgPost,
    deleteLfgPost,
    joinLfg,
    leaveLfg,
    editRole,
  };
  return (
    <DbContext.Provider value={value}>
      <EditUserName
        visible={userNameModalVisible}
        onClose={(newUserName) => handleCreateUser(newUserName)}
        onCancel={() => {}}
      />
      {children}
    </DbContext.Provider>
  );
}
