import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  type User,
  type Unsubscribe,
} from "firebase/auth";
import { auth } from "../config/firebase";
import type { UserRole } from "../types";
import { createUserProfile, getUserProfile } from "./firestoreService";

const googleProvider = new GoogleAuthProvider();

export async function signUpWithEmail(
  email: string,
  password: string,
  displayName: string,
  role: UserRole,
  studentCode?: string
): Promise<User> {
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(credential.user, { displayName });

  await createUserProfile(credential.user.uid, {
    uid: credential.user.uid,
    email,
    displayName,
    role,
    classIds: [],
    parentOf: [],
    studentCode: role === "student" ? generateStudentCode() : undefined,
    createdAt: Date.now(),
  });

  return credential.user;
}

export async function signInWithEmail(
  email: string,
  password: string
): Promise<User> {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user;
}

export async function signInWithGoogle(
  role?: UserRole
): Promise<User> {
  const credential = await signInWithPopup(auth, googleProvider);
  const user = credential.user;

  // Check if profile exists, create if new user
  const existing = await getUserProfile(user.uid);
  if (!existing) {
    await createUserProfile(user.uid, {
      uid: user.uid,
      email: user.email || "",
      displayName: user.displayName || "",
      role: role || "student",
      photoURL: user.photoURL || undefined,
      classIds: [],
      parentOf: [],
      studentCode: (role || "student") === "student" ? generateStudentCode() : undefined,
      createdAt: Date.now(),
    });
  }

  return user;
}

export async function signOut(): Promise<void> {
  await firebaseSignOut(auth);
}

export function onAuthStateChanged(
  callback: (user: User | null) => void
): Unsubscribe {
  return firebaseOnAuthStateChanged(auth, callback);
}

export async function resetPassword(email: string): Promise<void> {
  await sendPasswordResetEmail(auth, email);
}

function generateStudentCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}
