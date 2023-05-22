/* eslint-disable no-unused-vars */
import React, { useState, useContext, Link } from 'react';
import { useNavigate } from 'react-router-dom';
import IZTECHLogo from '../../assets/iztech.png';
import { userDictionary } from '../../db_mock/IOES_db';
import { UserContext } from '../../Providers/context';
import './LoginPage.css';

export default function LoginPage(){
    const [username, setUsername] = useState('');
    const [domain, setDomain] = useState('@std.iyte.edu.tr');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (username === '') {
            setErrorMessage('E-posta boş bırakılamaz.');
            return;
        }

         if (password === '')  {
            setErrorMessage('Şifre boş bırakılamaz.');
            return;
        }

        const email = username + domain;
        const isValidEmail = email in userDictionary;

        if (isValidEmail) {
            const isValidPassword = userDictionary[email].password === password;

            if (isValidPassword) {
                user.setEmail(email);
                user.setPassword(password);
                user.setAuthToken(Math.random());
                user.setRole(userDictionary[email].role);

                navigate('/dashboard');
            } else {
                setErrorMessage('E-posta veya şifre hatalı.')
            }
        } else {
            setErrorMessage('E-posta veya şifre hatalı.')
        }
    }

    return(
        
        <div className="login-body">
            <div className="login-cover">
                <div className='login-content'>
                    <img className="login-logo" src={IZTECHLogo} alt='Logo'></img>
                    <br />
                    <header className="login-content-header">İYTE Online Seçim Sistemi</header>
                    {errorMessage && <span className='error-message' id='login-error-message'>{errorMessage}</span>}
                    <form onSubmit={handleSubmit} className="login-credentials-wrapper">
                        <div>
                            <input value={username} onChange={(e) => setUsername(e.target.value)} className="login-credentials login-email" id='email-username' type="text" placeholder='E-Posta' />
                            <select value={domain} onChange={(e) => setDomain(e.target.value)} className='login-credentials email-domain' id='email-domain'>
		                        <option value="@std.iyte.edu.tr">@std.iyte.edu.tr</option>
                                <option value="@iyte.edu.tr">@iyte.edu.tr</option>
	                        </select>
                        </div>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} className="login-credentials login-password" id='password' type="password" placeholder="Şifre" />
                        <button className='btn' id='login-btn' type="submit">Oturum Aç</button>
                    </form>
                    <a className='login-forgot-password' href='https://mail-app.iyte.edu.tr/ForgotMyPassword' target='_blank' rel='noopener noreferrer'>Şifremi Unuttum</a>
                </div>
            </div>
        </div>

    )
}

