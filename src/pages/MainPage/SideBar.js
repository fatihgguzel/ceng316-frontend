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
        <div className="container">
           <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                      {roleActionArray[userRole].text}
                   </div>
               </div>
               {
                   roleActionArray[userRole].array.map((item, index)=>(
                       <NavLink to={item.url} key={index} className="link" activeclassName="active">
                        <div className="icon">
                            <img src={dot} style={{width:'20px', height:'20px'}}>
                            </img>
                        </div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>

                       </NavLink>
                   ))
               }
           </div>
        </div>
    );
};

export default Sidebar;