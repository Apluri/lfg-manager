import React, { useContext, useEffect, useState } from "react";
import { auth } from "../../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsub;
  }, []);
  function signIn() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider).catch((e) => console.log(e));
  }

  const value = {
    currentUser,
    signIn,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
