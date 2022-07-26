import db from './firebase'
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

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

    await addDoc(dbRef, employee);
    console.log(employee);
    return employee;
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

