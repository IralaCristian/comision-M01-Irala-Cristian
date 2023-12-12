import { useContext, useState, createContext } from "react";

export const AuthContext= useContext();

function AuthProvider({children}) {

    const [auth, setAuth] = useState({});

    const login= ({user, token})=> {
        setAuth({user, token});

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
    };

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setAuth(null);
    };

    return (
        <AuthContext.Provider value= { {auth, login, logout}}>
          {children}
        </AuthContext.Provider>
     )
}

export default AuthProvider