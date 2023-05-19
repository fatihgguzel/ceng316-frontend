import './Navbar.css';
import IZTECHLogo from '../../assets/iztech.png';

export default function Navbar(){
    return(
        <div className="navbar">
            <div className="navbar-header-wrapper">
                <img className="navbar-logo" src={IZTECHLogo} alt="logo"/>
                <span className="navbar-header">IOES</span>
            </div>
        </div>
    )
}
    