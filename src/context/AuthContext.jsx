import React, { createContext, useContext, useState, useEffect } from 'react';
import { getFirebase } from '../firebase';
import {
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile as firebaseUpdateProfile,
  updatePassword as firebaseUpdatePassword,
  signOut,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from 'firebase/auth';

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [idToken, setIdToken] = useState(null);
  const [userProfile, setUserProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(null);
  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);

  // Initialize Auth
  useEffect(() => {
    let unsubscribe = () => {};
    getFirebase().then(({ auth: firebaseAuth }) => {
      setAuth(firebaseAuth);
      
      // Setup listener
      unsubscribe = firebaseAuth.onAuthStateChanged(async (user) => {
        setCurrentUser(user);
        if (user) {
          const token = await user.getIdToken();
          setIdToken(token);
          localStorage.setItem('firebaseIdToken', token);
          
          // Fetch additional profile data from Neon DB
          try {
            const res = await fetch('/api/profile', {
              headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.ok && data.profile) {
              setUserProfile(data.profile);
            } else {
              setUserProfile({});
            }
          } catch (err) {
            console.error('Failed to load profile details from DB:', err);
            setUserProfile({});
          }
        } else {
          setIdToken(null);
          setUserProfile({});
          localStorage.removeItem('firebaseIdToken');
        }
        setLoading(false);
      });
    }).catch(err => {
      console.error('Error initializing authentication:', err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Initialize Recaptcha
  const initRecaptcha = (containerId) => {
    if (!auth || recaptchaVerifier) return;
    try {
      const verifier = new RecaptchaVerifier(auth, containerId, {
        size: 'invisible',
        callback: () => {}
      });
      setRecaptchaVerifier(verifier);
      return verifier;
    } catch (err) {
      console.error('Recaptcha initialization failed:', err);
    }
  };

  // Auth Operations
  const signInWithGoogle = async () => {
    if (!auth) return;
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const signInWithApple = async () => {
    if (!auth) return;
    const provider = new OAuthProvider('apple.com');
    return signInWithPopup(auth, provider);
  };

  const loginWithEmail = async (email, password) => {
    if (!auth) return;
    return signInWithEmailAndPassword(auth, email, password);
  };

  const registerWithEmail = async (name, email, password) => {
    if (!auth) return;
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await firebaseUpdateProfile(userCredential.user, { displayName: name });
    // Trigger local state updates
    await userCredential.user.reload();
    setCurrentUser(auth.currentUser);
    return userCredential.user;
  };

  const sendResetLink = async (email) => {
    if (!auth) return;
    return sendPasswordResetEmail(auth, email);
  };

  const sendVerificationEmail = async () => {
    if (!currentUser) return;
    return sendEmailVerification(currentUser);
  };

  const sendOtpCode = async (phoneNum, verifierInstance) => {
    if (!auth) return;
    return signInWithPhoneNumber(auth, phoneNum, verifierInstance);
  };

  const updateProfileData = async ({ name, email, date_of_birth, city }) => {
    if (!currentUser || !idToken) return;
    
    // 1. Sync backend Neon DB
    const res = await fetch('/api/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`
      },
      body: JSON.stringify({ name, email, date_of_birth, city })
    });
    const data = await res.json();
    if (!data.ok) throw new Error(data.error || 'Failed to update backend profile.');

    // 2. Sync Firebase Profile
    await firebaseUpdateProfile(currentUser, { displayName: name });
    await currentUser.reload();
    setCurrentUser(auth.currentUser);
    
    // Update local profile state
    setUserProfile({ name, email, date_of_birth, city });
  };

  const changeUserPassword = async (newPassword) => {
    if (!currentUser) return;
    await firebaseUpdatePassword(currentUser, newPassword);
  };

  const logout = async () => {
    if (!auth) return;
    return signOut(auth);
  };

  const value = {
    currentUser,
    idToken,
    userProfile,
    loading,
    initRecaptcha,
    signInWithGoogle,
    signInWithApple,
    loginWithEmail,
    registerWithEmail,
    sendResetLink,
    sendVerificationEmail,
    sendOtpCode,
    updateProfileData,
    changeUserPassword,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
