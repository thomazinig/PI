// UserContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    // Inicializa os dados do usuário a partir do localStorage se estiverem disponíveis
    const storedData = localStorage.getItem("userData");
    return storedData ? JSON.parse(storedData) : { id: null, grupo: null };
  });

  // Atualiza o localStorage sempre que userData mudar
  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
