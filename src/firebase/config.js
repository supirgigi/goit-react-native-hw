import { initializeApp } from 'firebase/app';
import {
  getReactNativePersistence,
  initializeAuth,
} from 'firebase/auth/react-native';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAE4XAQAOB_VhxnUl0NX_U_J5fGpwVgxOo',
  authDomain: 'rn-social-8de82.firebaseapp.com',
  projectId: 'rn-social-8de82',
  storageBucket: 'rn-social-8de82.appspot.com',
  messagingSenderId: '1059536892757',
  appId: '1:1059536892757:web:34e7e690683dcc959075dc',
};

export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);
export const storage = getStorage(app);
