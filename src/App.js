import './App.css';
import { Route, Link, Routes } from 'react-router-dom';

import React, { useContext, useEffect } from "react";
import { UserContext } from "./Providers/context"

import LoginPage from './pages/LoginPage/LoginPage';
import { UserContextProvider } from './Providers/context';
import Navbar from './components/navbar/Navbar';
import MainPage from './pages/MainPage/MainPage';
import AnnounceElectionDatePage from './pages/AnnounceElectionDatePage/AnnounceElectionDatePage';

import { useNavigate } from 'react-router-dom';

function App() {
  const navigation=useNavigate();

  const {user} = useContext(UserContext);

  useEffect(()=>{
    if(!user?.role){
      navigation('/');
    }
  },[])

  return (
    <div className="App">
      <UserContextProvider>
        <Navbar></Navbar>

        <div className="content">
          <Routes>
            <Route exact path="/" element={<LoginPage />} />
            <Route path="/dashboard" element={<MainPage />} />
            <Route path="/announce-election-date" element={<AnnounceElectionDatePage />} />

          </Routes>
        </div>
      </UserContextProvider>
    </div>
  );
}

export default App;