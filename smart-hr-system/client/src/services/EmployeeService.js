import db from './firebase'
import { collection, getDocs } from 'firebase/firestore';


export const getEmployees = async () => {
    const employeeCol = collection(db, 'employees');
    const employeeSnapshot = await getDocs(employeeCol);
    const emplList = employeeSnapshot.docs.map(doc => doc.data());
    console.log(emplList);
    return emplList;
}

