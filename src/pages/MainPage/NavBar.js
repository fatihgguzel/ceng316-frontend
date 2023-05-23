import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OuterButton=({text,subButtonArray,subButtonAddress})=>{
    const navigation=useNavigate();

    const [isHovered,setIsHovered]=useState(false);
    const handleHover=()=>{
        setIsHovered(!isHovered);
    }
    return(
        <div style={{ marginRight: '1px',paddingBottom:"50px" }}>
  
    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10px' , width:'130px' }}>
      <button className="navbar-button" onClick={handleHover} style={{height:"50px"}}>
      {text}
      </button>
      {isHovered&& (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {subButtonArray.map((element,index)=> <button className="sub-button" onClick={()=>{navigation(subButtonAddress[index])}} >{element}</button>)}
        </div>
      )}
    </div>
  </div>
    )
}


const Navbar = ({buttonArray}) => {
   

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start',flexDirection:"column" }}>
        <p>
            {buttonArray.text}
        </p>
        {
            buttonArray.array.map((button,index)=>
            <OuterButton text={button.text} 
            subButtonArray={button.subButtonArray} 
            subButtonAddress={button.subButtonAddress}
            />

            )
        }
    </div>
  );
};

export default Navbar;
