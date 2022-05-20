import React, { useContext, useEffect, useState } from "react";
import { database } from "../../firebase";
import { ref, onValue, set } from "firebase/database";
import { useAuth } from "./AuthContext";
import { User } from "firebase/auth";
import { Character, ClassNames } from "../../utils/CharacterUtils";
import { Modal, Paper } from "@mui/material";
import { EditUserName } from "../users/EditUserName";

enum Paths {
  CHARACTERS = "characters/",
  USERNAME = "userName/",
  USERS = "users/",
}
interface DatabaseContextInterface {
  user: UserData | null;
  allUsers: any;
  editUser: (user: UserData, userId: string) => Promise<void>;
  addCharacter: (newChar: Character) => Promise<void>;
  deleteCharacter: (charToDelete: Character) => void;
  editUserName: (newUserName: string) => void;
}

export type UserData = {
  userName: string;
  characters?: Character[];
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
      setUser({ userName: data.userName, characters: data.characters });
    });
  }
  // once called, it will keep calling the callback on each data update
  function getData(path: string, callback: (data: any) => void) {
    const dbRef = ref(database, path);
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        callback(data);
      }
    });
  }
  function getAllUsersData() {
    getData(Paths.USERS, (data) => setAllUsers(data));
  }
  function getLfgPosts() {}

  function handleCreateUser(newUserName: string) {
    setUserNameModalVisible(false);
    if (auth?.currentUser != null) {
      const tempUser: UserData = {
        userName: newUserName,
        characters: [
          /*
          {
            id: "testiid",
            charName: "cdu",
            character: ClassNames.SHADOWHUNTER,
            itemLevel: 100,
          },
          */
        ],
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

  const value: DatabaseContextInterface = {
    user,
    allUsers,
    editUser,
    addCharacter,
    deleteCharacter,
    editUserName,
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
