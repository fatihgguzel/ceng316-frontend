import React, { createContext, useState } from 'react';

export const UserContext = createContext({
  userID: null,
  userName: '',
  email: '',
  authToken: '',
  departmentID: null,
  role: '',
  departmentName: '',
  setUserID: () => {},
  setUserName: () => {},
  setEmail: () => {},
  setAuthToken: () => {},
  setDepartmentID: () => {},
  setRole: () => {},
  setDepartmentName: () => {},
  logout: () => {},
  setUser: (UserInfo, response) => {},
});

export const UserContextProvider = ({ children }) => {
  const [userID, setUserID] = useState(null);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [authToken, setAuthToken] = useState('');
  const [departmentID, setDepartmentID] = useState(null);
  const [role, setRole] = useState('');
  const [departmentName, setDepartmentName] = useState('');

  const logout = () => {
    setUserID(null);
    setUserName('');
    setEmail('');
    setAuthToken('');
    setDepartmentID(null);
    setRole('');
    setDepartmentName('');
  }

  const setUser = (UserInfo, response) => {
    user.setUserID(UserInfo.id);
    user.setUserName(UserInfo.name);
    user.setEmail(UserInfo.email);
    user.setAuthToken('Bearer ' + response.data.accessToken);
    user.setDepartmentID(UserInfo.department_id);
    user.setRole(UserInfo.role);
    user.setDepartmentName(UserInfo.department_name);
  }

  const user = {
    userID,
    userName,
    email,
    authToken,
    departmentID,
    role,
    departmentName,
    setUserID,
    setUserName,
    setEmail,
    setAuthToken,
    setDepartmentID,
    setRole,
    setDepartmentName,
    logout,
    setUser,
  };

  return (
    <UserContext.Provider value={{user}}>
      {children}
    </UserContext.Provider>
  );
};
