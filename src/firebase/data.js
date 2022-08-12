import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    query,
    orderBy,
    startAt,
    limit
} from 'firebase/firestore';



import mock from "../services/mock.json";

const firebaseConfig = {
    apiKey: "AIzaSyAHtkkfz7m4YTiPzmBHczdrgDvKZfqw9LY",
    authDomain: "tu-gerente-hdariodev.firebaseapp.com",
    projectId: "tu-gerente-hdariodev",
    storageBucket: "tu-gerente-hdariodev.appspot.com",
    messagingSenderId: "797656558700",
    appId: "1:797656558700:web:bdc9d3aca838bec1657c49"
};

export const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
const db = getFirestore(app);
// export const dba = firebase.firestore();


export async function insertNewDocument(document) {
    try {
        const docRef = collection(db, 'documents');
        const res = await addDoc(docRef, document);
        return res;
    } catch (error) {
        console.log(error);

    }
}

export async function getDocuments(limit = 0) {
    const documents = [];
    try {

        const colletionRef = collection(db, 'documents');
        const q = query(colletionRef);
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            documents.push(doc.data());
        });
        return documents;
    } catch (error) {
        console.log("error al traer documents", error);

    }
}


export async function migrateData() {
    try {
        mock.forEach(async (item) => {
            const docRef = collection(db, 'documents');
            const res = await addDoc(docRef, item);
            console.log(res);
        })
    } catch (error) {
        console.log(error);

    }
}

export async function getDocumentsPaginate(init = 1, end = 10) {
    let documents = [];
    try {
        const messagesRef = collection(db, 'documents');
        const q = query(messagesRef, orderBy('codigo'), startAt(init), limit(end));
        const docsSnap = await getDocs(q)
        docsSnap.forEach(doc => {
            documents.push(doc.data());
        })
    } catch (error) {
        console.log(error);
    }
    return documents;
}