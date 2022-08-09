import * as requester from "./requester";

const dataCollection = 'jobs';

export const getAllJobs = async () => {   
    return  requester.getAll(dataCollection);
}

export const addJob = async (jobData) => {
    return await requester.addDocument(jobData, dataCollection);
}

export const getJob = async (jobId) => { 
    return await requester.getDocument(jobId, dataCollection);
}

export const updateJob = async (jobId, updatedValue) => { 
    await requester.updateDocument(jobId, updatedValue, dataCollection);
    return getJob(jobId);
}

export const deleteJob = async (jobId) => { 
    return await requester.deleteDocument(jobId, dataCollection);
}

