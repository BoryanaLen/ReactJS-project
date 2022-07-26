import db from './firebase'
import { collection, doc, addDoc, getDocs, deleteDoc, getDoc, updateDoc } from 'firebase/firestore';

const dbRef = collection(db, "employees");

export const getAllEmployees = async () => {   
    const employeeSnapshot = await getDocs(dbRef); 
    const emplList = employeeSnapshot.docs.map(doc => doc);
    return emplList;
}

export const addEmployee = async (employeeData) => {
    const employee = {
        firstName: employeeData.firstName,
        lastName: employeeData.lastName,
        email: employeeData.email,
        address: employeeData.address,
        joinDate: employeeData.joinDate,
        phone: employeeData.phoneNumber,
        position: employeeData.position,
        department: employeeData.department
    }

    const doc = await addDoc(dbRef, employee);
    return doc;
}

export const getEmployee = async (employeeId) => { 
    const docRef = doc(db, "employees", employeeId);
    const docSnap = await getDoc(docRef);
    console.log(docSnap);
    return docSnap;
}

export const updateEmployee = async (employeeId, updatedValue) => { 
    const docRef = doc(db, "employees", employeeId);
    const docSnap = await updateDoc(docRef, updatedValue);
    return docSnap;
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

