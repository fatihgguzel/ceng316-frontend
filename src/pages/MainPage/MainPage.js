import React, { useContext } from "react";
import { UserContext } from "../../Providers/context";
import Navbar from "./NavBar";
import { roleActionArray } from "../../db_mock/IOES_db";
export default function MainPage(){
    const {user} = useContext(UserContext);

    return (
       <Navbar buttonArray={roleActionArray}/>
    )
}