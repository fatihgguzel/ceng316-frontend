import './Navbar.css';
import IZTECHLogo from '../../assets/iztech.png';
import { useNavigate } from 'react-router-dom';
import door from '../../assets/door.png';
import avatar from '../../assets/avatar.png';
import settings from '../../assets/setting.png';
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
                <div className='navbar-user'>
                    <img src={avatar} className='avatar-icon'>
                    </img>
                </div>
                <div className='navbar-settings'>
                    <img src={settings} className='settings-icon'>
                    </img>
                </div>
                <div className='navbar-exit' onClick={()=>{
                    navigation('/')
                    user.setRole('');
                    }}>
                    <img src={door} className='door-icon'>
                    </img>
                </div>
            </div>:null
            }
            </div>
            
        </div>
    )
}
    