import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../Providers/context';
import './MainPage.css';
import Sidebar from '../../components/sidebar/SideBar';
import { roleActionArray } from '../../db_mock/IOES_db';
import api from '../../Providers/api';

export default function MainPage() {
    const { user } = useContext(UserContext);
    const [election, setElection] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [userDepartmentName, setUserDepartmentName] = useState('');
    const [userFacultyName, setUserFacultyName] = useState('');
    const [electionWinners, setElectionWinners] = useState(null);



    const fetchElectionByDepartmentId = async () => {
        try {
            const response = await api.get(`/election/department/${user.departmentID}`);
            if (response.status === 200) {
                setElection(response.data);

            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setElection(null);
            } else if (error.response && error.response.status === 500) {
                setErrorMessage('Server error.');
            }
        }
    };

    const fetchDepartmentInfo = async () => {
        try {

            const response = await api.get('/department');
            if (response.status === 200) {

                const userDepartment = response.data.find(
                    department => department.id === parseInt(user.departmentID)
                );
                if (userDepartment) {
                    const { department_name, faculty_name } = userDepartment;
                    setUserDepartmentName(department_name);
                    setUserFacultyName(faculty_name);
                }
            }
        } catch (error) {
            if (error.response && error.response.status === 500) {
                setErrorMessage('Server error.');
            }
        }
    };



    useEffect(() => {
        fetchDepartmentInfo();
        fetchElectionByDepartmentId();
    }, [user.departmentId]);

    useEffect(() => {
        const getWinners = async () => {
            try {
                const response = await api.get(`/student/election-results/${user.departmentID}`)

                if(response.status){
                    setElectionWinners(response.data.map(item => item.name));
                }
                
            } catch (error) {
            }
            
        }
        getWinners();
    },[])

    const formatDate = (date) => {
        return date ? new Date(date).toLocaleDateString() : '';
    };

    const calculateRemainingTime = () => {
        if (election && election.end_time) {
            const currentDate = new Date();
            const endDate = new Date(election.end_time);
            const timeDiff = endDate - currentDate;

            if (timeDiff > 0) {
                const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
                return `${days} day(s) and ${hours} hour(s) left until the election`;
            }
        }

        return '';
    };

    return (
        <div className="mainpage-content">
            <Sidebar roleActionArray={roleActionArray} userRole={user.role} />
            <div className="election-content-wrapper">
                <div className="election-content">
                    <table className="election-table">
                        <thead>
                            <tr>
                                <th>Start Date of the Current Election</th>
                                <th>End Date of the Current Election</th>
                                <th>Department Name</th>
                                <th>Faculty Name</th>
                                <th>Round</th>
                                <th>Remaining Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{formatDate(election?.start_time) || "-"}</td>
                                <td>{formatDate(election?.end_time) || "-"}</td>
                                <td>{election ? userDepartmentName || "-" : "-"}</td>
                                <td>{election ? userFacultyName || "-" : "-"}</td>

                                <td>{election?.round || "-"}</td>
                                <td>{calculateRemainingTime() || "-"}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {electionWinners ? (
                <div className='election-winners-wrapper'>
                    <h3>Last Election Winners</h3>
                    <div>
                        {electionWinners.toString()} 
                    </div>
                </div>) : ('')}
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
}
