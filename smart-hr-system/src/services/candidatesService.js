import * as requester from "./requester";

const dataCollection = 'candidates';

export const getAllCandidates = async () => {   
    return await requester.getAll(dataCollection);
}

export const getAllCandidatesForUser = async () => {   
   const list = await requester.getDocumentsByUserId(dataCollection);
   return list;
}

export const addCandidate = async (candidateData, withoutAuth = false) => {
    return await requester.addDocument(candidateData, dataCollection, withoutAuth);
}

export const getCandidate = async (candidateId) => { 
    return await requester.getDocument(candidateId, dataCollection);
}

export const updateCandidate = async (candidateId, updatedValue) => { 
    await requester.updateDocument(candidateId, updatedValue, dataCollection);
    return await getCandidate(candidateId);
}

export const deleteCandidate = async (candidateId) => { 
    return await requester.deleteDocument(candidateId, dataCollection);
} 
