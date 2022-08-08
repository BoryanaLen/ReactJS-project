import React, {useContext} from 'react'
import { useLocalStorage } from "../hooks/useLocalStorage";

export const AuthContext = React.createContext()

export function AuthProvider({children, value}) {
    const [auth, setAuth] = useLocalStorage('auth', {});
    const [role, setRole] = useLocalStorage('role', '')

    const userLogin = (authData, role) => {
        setAuth(authData);
        setRole(role)
    };

    const userLogout = () => {
        console.log("logout")
        setAuth({}); 
        setRole('');     
    };

  return (
    <AuthContext.Provider value={{
        user: auth,
        userLogin,
        userLogout,
        isAuthenticated: !!auth.accessToken,
        role
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthValue(){
  return useContext(AuthContext)
}