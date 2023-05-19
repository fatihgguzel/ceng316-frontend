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

  const user = {
    email,
    password,
    authToken,
    role,
    setEmail,
    setPassword,
    setAuthToken,
    setRole
  };

  return (
    <UserContext.Provider value={{user}}>
      {children}
    </UserContext.Provider>
  );
};