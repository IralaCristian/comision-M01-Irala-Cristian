import { useState, createContext, useEffect } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [auth, setAuth] = useState(undefined);

  const login = ({ user, token }) => {
    setAuth({ user, token });

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    alert("Your session has closed");
    setAuth(null);
  };

  //return true if a user is logged, elsewhere return false
  const userIsLogged = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (user && token) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    // si no tenemos alguno de los dos campos en el localStorage borramos todo
    if (!user || !token) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      setAuth(null);
      return;
    }

    setAuth({ user, token });
  }, []);

  return (
    <AuthContext.Provider value={{ auth, login, logout, userIsLogged}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
