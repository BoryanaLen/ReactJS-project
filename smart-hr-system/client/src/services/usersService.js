import * as requester from "./requester";

const dataCollection = 'users';

export const getAllUsers = async () => {   
    return  requester.getAll(dataCollection);
}

export const addUser = async (user) => {
    return await requester.addDocument(user, dataCollection);
}

export const getUser = async (userId) => { 
    return await requester.getDocument(userId, dataCollection);
}

export const updateUser = async (userId, updatedValue) => { 
    await requester.updateDocument(userId, updatedValue, dataCollection);
    return getUser(userId);
}

export const deleteUser = async (userId) => { 
    return await requester.deleteDocument(userId, dataCollection);
}