import React, { useContext } from "react";
import { UserContext } from "../../Providers/context";
import Sidebar from "../../components/sidebar/SideBar";
import { roleActionArray } from "../../db_mock/IOES_db";


export default function Help(){
    const {user} = useContext(UserContext);


    return (
        <Sidebar roleActionArray={roleActionArray} userRole={user.role}/>
        )
}