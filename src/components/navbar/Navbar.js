import './Navbar.css';
import IZTECHLogo from '../../assets/iztech.png';
import { useNavigate } from 'react-router-dom';
import door from '../../assets/door.png';
import avatar from '../../assets/avatar.png';
import help from '../../assets/help.png';
import { UserContext } from "../../Providers/context"
import { useContext } from 'react';

export default function Navbar(){
    const navigation=useNavigate();
    const {user} = useContext(UserContext);

    return(
        <div className="navbar">
            <div className="navbar-header-wrapper" onClick={()=>{navigation('/dashboard')}}>
                <img className="navbar-logo" src={IZTECHLogo}  alt="logo"/>
                <span className="navbar-header">IOES</span>
            </div >

            <div className='navbar-right'>
            {
                user.role?<div className='avatar-header-wrapper'>
                <div className='navbar-user navbar-item' onClick={()=>{navigation('/profile')}}>
                    <img src={avatar} alt="user-icon" className='avatar-icon'>
                    </img>
                </div>
                <div className='navbar-settings navbar-item' onClick={()=>{navigation('/help')}}>
                    <img src={help} alt="settings-help" className='settings-icon'>
                    </img>
                </div>
                <div className='navbar-exit navbar-item' onClick={()=>{
                    navigation('/')
                    user.setRole('');
                    }}>
                    <img src={door} alt="exit-icon" className='door-icon'>
                    </img>
                </div>
            </div>:null
            }
            </div>
            
        </div>
    )
}
    