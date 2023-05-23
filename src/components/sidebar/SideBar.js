import './SideBar.css';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import menu from '../../assets/menu.png'

const Sidebar = ({roleActionArray,userRole}) => {

    return (
        <div className="sidebar-container" style={{height:'100%'}}>
           <div className="sidebar">
               {
                   roleActionArray[userRole]?.array.map((item, index)=>(
                       <NavLink to={item.url} key={index} className="sidebar-link" activeclassname="active">
                        <div className="sidebar-icon">
                        <img src={menu} alt="menu-action"  className='sidebar-dot'>
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