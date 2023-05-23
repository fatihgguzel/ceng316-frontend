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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authToken, setAuthToken] = useState('');
  const [role, setRole] = useState('');
  const [electionDates, setElectionDates] = useState({}); 

  const user = {
    email,
    password,
    authToken,
    role,
    electionDates,
    setEmail,
    setPassword,
    setAuthToken,
    setRole,
    setElectionDates
  };

  return (
    <UserContext.Provider value={{user}}>
      {children}
    </UserContext.Provider>
  );
};
