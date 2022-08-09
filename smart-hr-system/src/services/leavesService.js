import * as requester from "./requester";

const dataCollection = 'leaves';

export const getAllLeaves = async () => {   
    return await requester.getAll(dataCollection);
}

export const getAllLeavesForUser = async () => {   
   const list = await requester.getDocumentsByUserId(dataCollection);
   return list;
}

export const addLeave = async (leaveData) => {
    return await requester.addDocument(leaveData, dataCollection);
}

export const getLeave = async (leaveId) => { 
    return await requester.getDocument(leaveId, dataCollection);
}

export const updateLeave = async (leaveId, updatedValue) => { 
    await requester.updateDocument(leaveId, updatedValue, dataCollection);
    return await getLeave(leaveId);
}

export const deleteLeave = async (leaveId) => { 
    return await requester.deleteDocument(leaveId, dataCollection);
} 