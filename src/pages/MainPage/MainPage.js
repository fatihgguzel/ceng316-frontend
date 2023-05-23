import React, { useContext, useEffect } from "react";
import { UserContext } from "../../Providers/context";
import Navbar from "./NavBar";
import { roleActionArray } from "../../db_mock/IOES_db";

import { useNavigate } from 'react-router-dom';

export default function MainPage(){
    const {user} = useContext(UserContext);
    const navigation=useNavigate();

    useEffect(()=>{
        //TODO change after css changes
        if(!user?.role){
          navigation('/');
        }
      },[])
    return (
       <Navbar buttonArray={roleActionArray}/>
    )
}