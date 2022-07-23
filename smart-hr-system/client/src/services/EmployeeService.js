import db from './firebase'
import { collection, addDoc, getDocs } from 'firebase/firestore';

const dbRef = collection(db, "employees");

export const getEmployees = async () => {   
    const employeeSnapshot = await getDocs(dbRef); 
    const emplList = employeeSnapshot.docs.map(doc => doc.data());
    console.log(emplList);
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

