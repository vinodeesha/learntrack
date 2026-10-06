import { initializeApp } from 'firebase/app'
import { connectAuthEmulator, getAuth } from 'firebase/auth'
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'

export const isLocalMode = import.meta.env.DEV

const productionConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

if (!isLocalMode && Object.values(productionConfig).some((value) => !value)) {
  throw new Error('Production Firebase configuration is incomplete.')
}

const app = initializeApp(isLocalMode
  ? { projectId: 'demo-learntrack', apiKey: 'demo-key', authDomain: 'demo-learntrack.firebaseapp.com' }
  : productionConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)

if (isLocalMode) {
  connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true })
  connectFirestoreEmulator(db, '127.0.0.1', 8080)
}