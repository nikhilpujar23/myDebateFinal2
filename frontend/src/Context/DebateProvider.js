import React, { createContext, useContext, useEffect, useState } from "react";


const DebateContext = createContext();

const DebateProvider = ({ children }) => {
  const [selectedDebate, setSelectedDebate] = useState();
  const [user, setUser] = useState();
  const [notification, setNotification] = useState([]);
  const [debates, setDebates] = useState();

  


  return (
    <DebateContext.Provider
      value={{
        selectedDebate,
        setSelectedDebate,
        user,
        setUser,
        notification,
        setNotification,
        debates,
        setDebates,
      }}
    >
      {children}
    </DebateContext.Provider>
  );
};

export const DebateState = () => {
  return useContext(DebateContext);
};

export default DebateProvider;