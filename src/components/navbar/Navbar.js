import './Navbar.css';
import IZTECHLogo from '../../assets/iztech.png';
import { useNavigate } from 'react-router-dom';
import door from '../../assets/door.png';
import avatar from '../../assets/avatar.png';
import settings from '../../assets/setting-icon.jpeg';
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
            </div>
            {
                user.role?<div className='avatar-header-wrapper'>
                <div className='user'>
                    <img src={avatar} className='avatar-icon'>
                    </img>
                </div>
                <div className='settings'>
                    <img src={settings} className='settings-icon'>
                    </img>
                </div>
                <div className='exit' onClick={()=>{
                    navigation('/')
                    user.setRole('');
                    }}>
                    <img src={door} className='door-icon'>
                    </img>
                </div>
            </div>:null
            }
            
        </div>
    )
}
    