import React, { createContext, useState } from 'react';

export const UserContext = createContext({
  email: '',
  password: '',
  authToken: '',
  role: '',
  setEmail: () => {},
  setPassword: () => {},
  setAuthToken: () => {},
  setRole: () => {}
});

export const UserContextProvider = ({ children }) => {
  const [userID, setUserID] = useState(null);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [authToken, setAuthToken] = useState('');
  const [departmentID, setDepartmentID] = useState(null);
  const [role, setRole] = useState('');
  const [electionDates, setElectionDates] = useState({}); 

  const user = {
    userID,
    userName,
    email,
    authToken,
    departmentID,
    role,
    electionDates,
    setUserID,
    setUserName,
    setEmail,
    setAuthToken,
    setDepartmentID,
    setRole,
    setElectionDates
  };

  return (
    <UserContext.Provider value={{user}}>
      {children}
    </UserContext.Provider>
  );
};
