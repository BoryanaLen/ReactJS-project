import * as requester from "./requester";

const dataCollection = 'users';

export const getUser = async () => {   
    return  await requester.getUser();
}

export const isUserAdmin = async () => {   
    return  await requester.isUserAdmin();
}

export const getUserById = async (id) => {   
    const list =  await requester.getAll(dataCollection);
    const found = list.find(obj => {
        return obj.data().userId=== id;
    });
    return found.data()
}

export const getAllUsers = async () => {   
    return await requester.getAll(dataCollection);
}

export const addUser = async (user) => {
    return await requester.addDocument(user, dataCollection);
}

export const updateUser = async (userId, updatedValue) => { 
    await requester.updateDocument(userId, updatedValue, dataCollection);
    return getUser(userId);
}

export const deleteUser = async (userId) => { 
    return await requester.deleteDocument(userId, dataCollection);
}