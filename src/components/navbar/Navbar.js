import './Navbar.css';
import IZTECHLogo from '../../assets/iztech.png';
import { useNavigate } from 'react-router-dom';

export default function Navbar(){
    const navigation=useNavigate();

    return(
        <div className="navbar">
            <div className="navbar-header-wrapper" onClick={()=>{navigation('/dashboard')}}>
                <img className="navbar-logo" src={IZTECHLogo}  alt="logo"/>
                <span className="navbar-header">IOES</span>
            </div>
            
        </div>
    )
}
    