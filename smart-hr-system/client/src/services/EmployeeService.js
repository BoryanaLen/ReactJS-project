import { app } from './firebase'
import { getFirestore } from 'firebase/firestore';
import { collection, doc, addDoc, getDocs, deleteDoc, getDoc, updateDoc } from 'firebase/firestore';

const db = getFirestore(app);
const dbRef = collection(db, "employees");

export const getAllEmployees = async () => {   
    const employeeSnapshot = await getDocs(dbRef); 
    const emplList = employeeSnapshot.docs.map(doc => doc);
    return emplList;
}

export const addEmployee = async (employeeData) => {
    const doc = await addDoc(dbRef, employeeData);
    console.log(doc);
    return doc;
}

export const getEmployee = async (employeeId) => { 
    const docRef = doc(db, "employees", employeeId);
    const docSnap = await getDoc(docRef);
    return docSnap;
}

export const updateEmployee = async (employeeId, updatedValue) => { 
    const docRef = doc(db, "employees", employeeId);
    await updateDoc(docRef, updatedValue);
    return getEmployee(employeeId);
}

export const deleteEmployee = async (employeeId) => { 
    const docRef = doc(db, "employees", employeeId);
    deleteDoc(docRef)
        .then(() => {
            console.log("Entire Document has been deleted successfully.")
        })
        .catch(error => {
            console.log(error);
        })
}

