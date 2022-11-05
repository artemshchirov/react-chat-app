import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/auth';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDEGy1yomBgNBzjOTh8yYpWwSdnjLDLCCI',
  authDomain: 'chat-b4d42.firebaseapp.com',
  projectId: 'chat-b4d42',
  storageBucket: 'chat-b4d42.appspot.com',
  messagingSenderId: '961401435426',
  appId: '1:961401435426:web:dec60589bad762af46a17b',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
