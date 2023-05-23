import React, { useContext, useEffect, useRef } from "react";
import { UserContext } from "../../Providers/context";
import { roleActionArray } from "../../db_mock/IOES_db";
import './MainPage.css';

import { useNavigate } from 'react-router-dom';
import Sidebar from "../../components/sidebar/SideBar";

export default function MainPage(){
    const {user} = useContext(UserContext);

    const formatDate = (date) => {
        return date ? date.toLocaleDateString() : '';
    };

    return (
        <div className="mainpage-content">
            <Sidebar roleActionArray={roleActionArray} userRole={user.role}/>
            <div className="election-content-wrapper">
                <div className="election-content">
                    <div className="election-start-date-wrapper">
                        <span>Start Date of the Current Election : {formatDate(user.electionDates.startDate)}</span>
                    </div>

                    <div className="election-end-date-wrapper">
                        <span>End Date of the Current Election : {formatDate(user.electionDates.endDate)}</span>
                    </div>
                </div>

            </div>
        </div>
    )
}