import * as requester from "./requester";

const dataCollection = 'employees';

export const getAllEmployees = async () => {   
    return  requester.getAll(dataCollection);
}

export const getCurrentEmployee = async () => {   
    const user = await requester.getUser();
    const list =  await requester.getAll(dataCollection);
    const found = list.find(obj => {
        return obj.data().email=== user.email;
      });
    console.log(found.data())
    return found.data()
}

export const addEmployee = async (employeeData) => {
    return await requester.addDocument(employeeData, dataCollection, false);
}

export const getEmployee = async (employeeId) => { 
    return await requester.getDocument(employeeId, dataCollection);
}

export const updateEmployee = async (employeeId, updatedValue) => { 
    await requester.updateDocument(employeeId, updatedValue, dataCollection);
    return getEmployee(employeeId);
}

export const deleteEmployee = async (employeeId) => { 
    return await requester.deleteDocument(employeeId, dataCollection);
}

