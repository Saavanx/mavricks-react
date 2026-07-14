import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

let appInstance = null;
let authInstance = null;

export async function getFirebase() {
  if (getApps().length > 0) {
    return {
      app: getApp(),
      auth: getAuth()
    };
  }

  try {
    const res = await fetch('/api/firebase-config');
    const config = await res.json();
    appInstance = initializeApp(config);
    authInstance = getAuth(appInstance);
    return { app: appInstance, auth: authInstance };
  } catch (err) {
    console.error('Failed to initialize Firebase dynamically:', err);
    throw err;
  }
}
