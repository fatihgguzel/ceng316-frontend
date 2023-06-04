import React, { useState, useContext, Link, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import IZTECHLogo from '../../assets/iztech.png';
import { UserContext } from '../../Providers/context';
import { SpinnerCircularFixed } from 'spinners-react';
import jwt_decode from 'jwt-decode';
import './LoginPage.css';
import api from '../../Providers/api';

export default function LoginPage(){
    const [username, setUsername] = useState('');
    const [domain, setDomain] = useState('@std.iyte.edu.tr');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const handleSubmit = async (e) =>  {
        e.preventDefault();

        if (username === '') {
            setErrorMessage("E-mail can't be empty.");
            return;
        }

         if (password === '')  {
            setErrorMessage("Password can't be empty");
            return;
        }

        const email = username + domain;
        try {
            setIsLoading(true);
            const response = await api.post('/auth/login',
            {
                "email": email,
                "password":password
            }
            )

            if (response.status === 200) {
                const { UserInfo } = jwt_decode(response.data.accessToken)
                user.setUser(UserInfo, response);
                navigate('/dashboard');
            }
        }
        catch(error){
            setErrorMessage("Incorrect Credentials")
        }
        finally{
            setIsLoading(false);
        }
    }

    return(
        
        <div className="login-body">
            <div className="login-cover">
                <div className='login-content'>
                    <img className="login-logo" src={IZTECHLogo} alt='Logo'></img>
                    <br />
                    <header className="login-content-header">IZTECH Online Election System</header>
                    {errorMessage && <span className='error-message' id='login-error-message'>{errorMessage}</span>}
                    <form onSubmit={handleSubmit} className="login-credentials-wrapper">
                        <div>
                            <input value={username} onChange={(e) => setUsername(e.target.value)} className="login-credentials login-email" id='email-username' type="text" placeholder='E-Mail' />
                            <select value={domain} onChange={(e) => setDomain(e.target.value)} className='login-credentials email-domain' id='email-domain'>
		                        <option value="@std.iyte.edu.tr">@std.iyte.edu.tr</option>
                                <option value="@iyte.edu.tr">@iyte.edu.tr</option>
	                        </select>
                        </div>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} className="login-credentials login-password" id='password' type="password" placeholder="Password" />
                        <button className='btn' id='login-btn' type="submit">{isLoading ? (<SpinnerCircularFixed size={15} thickness={150} speed={100} color="rgba(255, 255, 255, 1)" secondaryColor="rgba(0, 0, 0, 0)" />) : 'Log in'}</button>
                    </form>
                    <a className={'login-forgot-password'} href='https://mail-app.iyte.edu.tr/ForgotMyPassword' target='_blank' rel='noopener noreferrer'>Forgot Password</a>
                </div>
            </div>
        </div>
    )
}

