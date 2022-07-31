import * as requester from "./requester";

const dataCollection = 'employees';

export const getAllEmployees = async () => {   
    return  requester.getAll(dataCollection);
}

export const addEmployee = async (employeeData) => {
    return await requester.addDocument(employeeData, dataCollection);
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

