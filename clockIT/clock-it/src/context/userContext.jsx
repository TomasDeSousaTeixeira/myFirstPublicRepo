import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();

// Create provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();

  const [id, setId] = useState();

  const [userRole, setUserRole] = useState();

  return (
    <UserContext.Provider value={{ user, setUser, id, setId, userRole, setUserRole}}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use user context
export const useUser = () => useContext(UserContext);
