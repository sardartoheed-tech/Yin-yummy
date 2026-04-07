import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Import the Firebase configuration
import firebaseConfig from '../firebase-applet-config.json';

// Initialize Firebase SDK
const isPlaceholder = firebaseConfig.apiKey === 'YOUR_API_KEY';

if (isPlaceholder) {
  console.warn('Firebase is using placeholder configuration. Please update firebase-applet-config.json with your real Firebase keys.');
}

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
