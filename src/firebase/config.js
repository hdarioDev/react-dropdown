
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebase = initializeApp({
    apiKey: "AIzaSyCZZX9RG9ZGLLwDPwV3cd6CfF8Cb4LkAT0",
    authDomain: "test-bf2ba.firebaseapp.com",
    databaseURL: "https://test-bf2ba.firebaseio.com",
    projectId: "test-bf2ba",
    storageBucket: "test-bf2ba.appspot.com",
    messagingSenderId: "967119802924",
    appId: "1:967119802924:web:9ec48da1d90429ad46f789",
    measurementId: "G-14Q0WW8QD7"
});

export const firestore = getFirestore(firebase);
