import React, { useContext, useEffect } from "react";
import { UserContext } from "../../Providers/context";
import Sidebar from "../../components/sidebar/SideBar";
import { roleActionArray } from "../../db_mock/IOES_db";


export default function Profile(){
    const {user} = useContext(UserContext);

    return (
        <Sidebar roleActionArray={roleActionArray} userRole={user.role}/>
        )
}