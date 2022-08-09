import * as requester from "./requester";

const dataCollection = 'events';

export const isUserAdmin = async() => {
    return requester.isUserAdmin();
}

export const getAllEvents = async () => {   
    return  requester.getAll(dataCollection);
}

export const getAllEventsForUser = async () => {   
    return await requester.getDocumentsByUserId(dataCollection);
}

export const addEvent= async (eventData) => {
    return await requester.addDocument(eventData, dataCollection);
}

export const getEvent= async (eventId) => { 
    return await requester.getDocument(eventId, dataCollection);
}

export const updateEvent= async (eventId, updatedValue) => { 
    await requester.updateDocument(eventId, updatedValue, dataCollection);
    return getEvent(eventId);
}

export const deleteEvent= async (eventId) => { 
    return await requester.deleteDocument(eventId, dataCollection);
}