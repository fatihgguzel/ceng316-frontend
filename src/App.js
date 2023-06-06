import './App.css';
import { Route, Link, Routes, Navigate } from 'react-router-dom';

import React, { useContext, useEffect } from "react";
import { UserContext } from "./Providers/context"

import LoginPage from './pages/LoginPage/LoginPage';
import { UserContextProvider } from './Providers/context';
import Navbar from './components/navbar/Navbar';
import MainPage from './pages/MainPage/MainPage';
import AnnounceElectionDatePage from './pages/AnnounceElectionDatePage/AnnounceElectionDatePage';
import ReviewCandidatesPage from './pages/ReviewCandidatesPage/ReviewCandidatesPage';
import Profile from './pages/Profile/Profile';
import Help from './pages/Help/Help';
import RearrangeElectionDatePage from './pages/RearrangeElectionDatePage/RearrangeElectionDatePage'

import { useNavigate } from 'react-router-dom';
import PrivateRoutes from './utils/PrivateRoutes';
import CandidateApplicationPage from './pages/CandidateApplicationPage/CandidateApplicationPage';
import Candidates from './pages/Candidates/Candidates';

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <Navbar></Navbar>

        <div className="content">
          <Routes>
            <Route exact path="/" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route element={<PrivateRoutes roleRestrictions={['admin']}/>}>
              <Route path="/announce-election-date" element={<AnnounceElectionDatePage />} />
              <Route path="/candidate-applications" element={<ReviewCandidatesPage/>}/>
              <Route path="/rearrange-election-date" element={<RearrangeElectionDatePage/>}/> 
              </Route>
            <Route element={<PrivateRoutes roleRestrictions={['admin', 'student']}/>}>
              <Route path="/dashboard" element={<MainPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/help" element={<Help />} />
              <Route path="/candidate-application" element={<CandidateApplicationPage/>} />
              <Route path="/candidates" element={<Candidates />} />
            </Route>
          </Routes>
        </div>
      </UserContextProvider>
    </div>
  );
}

export default App;