import React, {useContext} from 'react'
import { useLocalStorage } from "../hooks/useLocalStorage";

export const AuthContext = React.createContext()

export function AuthProvider({children, value}) {
    const [auth, setAuth] = useLocalStorage('auth', {});

    const userLogin = (authData) => {
        setAuth(authData);
    };

    const userLogout = () => {
        setAuth({});
    };

  return (
    <AuthContext.Provider value={{
        user: auth,
        userLogin,
        userLogout,
        //isAuthenticated: !!auth.accessToken
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthValue(){
  return useContext(AuthContext)
}