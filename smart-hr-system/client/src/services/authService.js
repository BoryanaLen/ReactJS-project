import  app  from './firebase'
import { getFirestore } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

const auth = getAuth(app);

export const login = async (email, password) => {
    console.log('try to login')
   try{
    const user = await auth.signInWithEmailAndPassword(email, password);
    console.log(user.user);
    return user; 
   }catch(error){
    console.log(error);
   }
}

export const logout = async() => {
    await auth.signOut()
}

export const register = async (name, email, password)  => {
    await auth.createUserWithEmailAndPassword(email, password)
    await auth.currentUser.updateProfile({
        displayName: name,
    })
}

export const updateName = (newName) => {
    auth.currentUser.updateProfile({
        displayName: newName,
    })
}

export const getCurrentUser = () => {
    const user = auth.currentUser
        ? {
            email: auth.currentUser.email,
            password: auth.currentUser.password,
            userId: auth.currentUser.uid
          }
        : null
    return user
}
