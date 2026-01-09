"use client";
import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  Auth,
  UserCredential,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCJLQO5_RnRf26uVHmTNtH9WZJVy3xTKMQ",
  authDomain: "ambitful.firebaseapp.com",
  projectId: "ambitful",
  storageBucket: "ambitful.firebasestorage.app",
  messagingSenderId: "658210146670",
  appId: "1:658210146670:web:7da71bca8f25c882e2597f",
};

// Initialize Firebase only on client side
let app: FirebaseApp | undefined;
let auth: Auth | undefined;

if (typeof window !== "undefined") {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  auth = getAuth(app);
}

const googleProvider = new GoogleAuthProvider();
googleProvider.addScope("email");
googleProvider.addScope("profile");
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export async function signInWithGoogle(): Promise<{
  idToken: string;
  user: {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
  };
}> {
  if (!auth) {
    throw new Error("Firebase auth not initialized");
  }

  const result: UserCredential = await signInWithPopup(auth, googleProvider);
  const idToken = await result.user.getIdToken();

  return {
    idToken,
    user: {
      uid: result.user.uid,
      email: result.user.email,
      displayName: result.user.displayName,
      photoURL: result.user.photoURL,
    },
  };
}

export async function signOutFromFirebase(): Promise<void> {
  if (!auth) {
    throw new Error("Firebase auth not initialized");
  }
  await signOut(auth);
}

export { app, auth };
