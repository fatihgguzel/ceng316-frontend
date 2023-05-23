import './SideBar.css';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import dot from '../../assets/dot-icon.png'
const Sidebar = ({roleActionArray,userRole}) => {

    return (
        <div className="sidebar-container" style={{height:'100%'}}>
           <div className="sidebar">
               <div className="sidebar-top-section">
                   <div className="sidebar-bars">
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