import React, { useContext, useEffect, useState } from "react";
import { auth } from "../../firebase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  UserCredential,
  User,
} from "firebase/auth";

interface AuthContextInterface {
  currentUser: User | null;
  signIn: () => Promise<UserCredential | void>;
  logOut: () => void;
}

const AuthContext = React.createContext<AuthContextInterface | null>(null);

export function useAuth() {
  return useContext(AuthContext);
}

type Props = {
  children: React.ReactNode;
};
export function AuthProvider({ children }: Props) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsub;
  }, []);
  function signIn(): Promise<UserCredential | void> {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider).catch((e) => console.log(e));
  }
  function logOut(): void {
    signOut(auth);
  }

  const value: AuthContextInterface = {
    currentUser,
    signIn,
    logOut,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
