import { app } from './firebase'
import { getFirestore } from 'firebase/firestore';
import { collection, doc, addDoc, getDocs, deleteDoc, getDoc, updateDoc } from 'firebase/firestore';

const db = getFirestore(app);

export const getUser = async () => {   
    const user = localStorage.getItem('auth');
    const auth = JSON.parse(user || '{}'); 
    console.log(auth.user.email);
    return auth.user;
}

export const isUserAdmin = async () => {    
    return getUser().email==="admin@admin.com";
}

export const getAll = async (dataCollection) => { 
    const dbRef = collection(db, dataCollection);  
    const snapshot = await getDocs(dbRef); 
    const list = snapshot.docs.map(doc => doc);
    return list;
}

export const getDocumentsByUserId = async (dataCollection) => {    
    const all = await getAll(dataCollection);
    const list = all.filter(d => d.data().uid=== getUser().uid);
    return list;
}

export const addDocument = async (data, dataCollection) => {
    data.uid = getUser().uid;
    console.log(data);
    const dbRef = collection(db, dataCollection); 
    const doc = await addDoc(dbRef, data);
    return doc;
}

export const getDocument = async (docId, dataCollection) => { 
    const docRef = doc(db, dataCollection, docId);
    const docSnap = await getDoc(docRef);
    return docSnap;
}

export const updateDocument = async (docId, updatedValue, dataCollection) => { 
    const docRef = doc(db, dataCollection, docId);
    const res = await updateDoc(docRef, updatedValue);
    console.log(res);
}

export const deleteDocument = async (docId, dataCollection) => { 
    const docRef = doc(db, dataCollection, docId);
    deleteDoc(docRef)
        .then(() => {
            console.log("Entire Document has been deleted successfully.")
        })
        .catch(error => {
            console.log(error);
        })
}

