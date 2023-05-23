import React, { useContext, useEffect } from "react";
import { UserContext } from "../../Providers/context";
import { roleActionArray } from "../../db_mock/IOES_db";

import { useNavigate } from 'react-router-dom';
import Sidebar from "./SideBar";

export default function MainPage(){
    const {user} = useContext(UserContext);


    return (
            <Sidebar roleActionArray={roleActionArray} userRole={user.role}/>
        )
}