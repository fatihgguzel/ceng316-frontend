import './SideBar.css';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import dot from '../../assets/dot-icon.png'
const Sidebar = ({roleActionArray,userRole}) => {
    const[isOpen ,setIsOpen] = useState(true);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/",
            name:"Dashboard",
        },
        {
            path:"/about",
            name:"About",
        },
        {
            path:"/analytics",
            name:"Analytics",
        },
        {
            path:"/comment",
            name:"Comment",
        },
        {
            path:"/product",
            name:"Product",
        },
        {
            path:"/productList",
            name:"Product List",
        }
    ]
    return (
        <div className="sidebar-container" style={{height:'100%'}}>
           <div className="sidebar">
               <div className="sidebar-top-section">
                   <div style={{marginLeft: "50px"}} className="sidebar-bars">
                      {roleActionArray[userRole]?.text}
                   </div>
               </div>
               {
                   roleActionArray[userRole]?.array.map((item, index)=>(
                       <NavLink to={item.url} key={index} className="sidebar-link" activeclassName="active">
                        <div className="sidebar-icon">
                        <img src={dot}  className='sidebar-dot'>
                            </img>
                        </div>
                        <div className="sidebar-text">{item.name}</div>

                       </NavLink>
                   ))
               }
           </div>
        </div>
    );
};

export default Sidebar;