import route from "next/router";
import { createContext, useEffect, useState } from "react";
import firebase from "../../firebase/config";
import User from "../../model/User";
import Cookies from "js-cookie";

interface AuthContextProps {
  user?: User;
  googleLogin?: () => Promise<void>;
  logout?: () => Promise<void>;
  isLoading?: boolean;
  login?: (email: string, password: string) => Promise<void>;
  signUp?: (email: string, password: string) => Promise<void>;
}

const COOKIE_NAME = "admin-template-anderson-auth";

const AuthContext = createContext<AuthContextProps>({});

async function normalizeUser(firebaseUser: firebase.User): Promise<User> {
  const token = await firebaseUser.getIdToken();
  return {
    uid: firebaseUser.uid,
    name: firebaseUser.displayName,
    email: firebaseUser.email,
    token,
    provider: firebaseUser.providerData[0].providerId,
    imageUrl: firebaseUser.photoURL,
  };
}

function manageCookie(isLogged: boolean) {
  if (isLogged) {
    Cookies.set(COOKIE_NAME, isLogged, {
      expires: 7,
    });
  } else {
    Cookies.remove(COOKIE_NAME);
  }
}

export function AuthProvider(props) {
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState<User>(null);

  const setSession = async (firebaseUser) => {
    if (firebaseUser?.email) {
      const user = await normalizeUser(firebaseUser);
      setUser(user);
      manageCookie(true);
      setLoading(false);
      return user.email;
    } else {
      setUser(null);
      manageCookie(false);
      setLoading(false);
      return false;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      await setSession(response.user);
      route.push("/");
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      await setSession(response.user);
      route.push("/");
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    try {
      setLoading(true);
      const response = await firebase
        .auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider());
      await setSession(response.user);
      route.push("/");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await firebase.auth().signOut();
      await setSession(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (Cookies.get(COOKIE_NAME)) {
      const cancel = firebase.auth().onIdTokenChanged(setSession);
      return () => {
        cancel();
      };
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        googleLogin,
        logout,
        isLoading,
        login,
        signUp,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
