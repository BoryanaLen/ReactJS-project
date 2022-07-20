import db from './firebase'
import { collection, getDocs } from 'firebase/firestore';

async function getEmployees() {
    const employeeCol = collection(db, 'employees');
    const employeeSnapshot = await getDocs(employeeCol);
    const emplList = employeeSnapshot.docs.map(doc => doc.data());
    console.log(emplList);
    return emplList;
}

class EmployeeService{

    async  getAll () {
        getEmployees();
    };
}



// const create = (data) => {
//   return db.push(data);
// };

// const update = (key, data) => {
//   return db.child(key).update(data);
// };

// const remove = (key) => {
//   return db.child(key).remove();
// };

// const removeAll = () => {
//   return db.remove();
// };

export default new EmployeeService()