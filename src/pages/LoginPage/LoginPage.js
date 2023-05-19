/* eslint-disable no-unused-vars */
import React, { useState,useContext } from 'react';
import IZTECHLogo from '../../assets/iztech.png';
import './LoginPage.css';

export default function LoginPage(){
    return(
        <div className="login-body">
            <div className="login-cover">
                <div className='login-content'>
                    <img className="login-logo" src={IZTECHLogo} alt='Logo'></img>
                    <header className="login-content-header">Login</header>
                    <div className="login-credentials-wrapper">
                        <input className="login-credentials login-email" type="text" placeholder='E-Mail' />
                        <input className="login-credentials login-password" type="password" placeholder="Password" />
                    </div>
                </div>
            </div>
        </div>
        
    )
}

