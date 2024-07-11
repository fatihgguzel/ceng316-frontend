import React, { useContext, useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './RearrangeElectionDatePage.css';
import Sidebar from '../../components/sidebar/SideBar';
import { UserContext } from '../../Providers/context';
import { useNavigate } from 'react-router-dom';
import api from '../../Providers/api';
import { SpinnerCircularFixed } from 'spinners-react';
import { roleActionArray } from '../../db_mock/IOES_db';

export default function RearrangeElectionDatePage() {
    const { user } = useContext(UserContext);
    const navigation = useNavigate();
    const [isLoadingRearrange, setIsLoadingRearrange] = useState(false);
    const [isLoadingCancel, setIsLoadingCancel] = useState(false);
    const today = new Date();
    const [candidates, setCandidates] = useState([]);


    const [election, setElection] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [isInitialized, setInitialized] = useState(false);
    const [finishElectionLoading, setFinishElectionLoading] = useState(false);

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        if (!user?.role === 'admin') {
            navigation('/');
        }
        fetchElectionByDepartmentId();
    }, []);

    const fetchCandidatesByDepartmentId = async () => {
        try {
            const response = await api.get(`/candidate/${user.departmentID}`);
            if (response.status === 200) {
                setCandidates(response.data);
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setCandidates([]);
            } else if (error.response && error.response.status === 500) {
                setErrorMessage(error);
            }
        }
    };




    const fetchElectionByDepartmentId = async () => {
        try {
            const response = await api.get(`/election/department/${user.departmentID}`);
            if (response.status === 200) {
                setElection(response.data);

            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setElection(null);
                setErrorMessage('Not found');
            } else if (error.response && error.response.status === 500) {
                setErrorMessage('Server error.');
            }
        }
        finally {
            setInitialized(true);
            fetchCandidatesByDepartmentId();
        }
    };

    const handleRearrangeDate = async () => {
        if (startDate && endDate) {
            const startDateObj = new Date(startDate);
            const endDateObj = new Date(endDate);
            const diffInDays = Math.floor((endDateObj - startDateObj) / (1000 * 60 * 60 * 24));

            if (startDateObj >= endDateObj) {
                setErrorMessage('The start day of the election cannot be the same day as the end date or later.');
            } else if (diffInDays > 60) {
                setErrorMessage('The period between the start date and end date cannot exceed 60 days.');
            } else {
                try {
                    setIsLoadingRearrange(true);
                    const response = await api.put('/election/update-election-date', {
                        startDate: formatDate(startDateObj),
                        endDate: formatDate(endDateObj),
                        departmentId: user.departmentID,
                    });
                    if (response.status === 200) {
                        setErrorMessage('');
                        setStartDate(null);
                        setEndDate(null);
                        navigation('/dashboard');
                    }
                } catch (error) {
                    if (error.response && error.response.status === 400) {
                        setErrorMessage('Bad request.');
                    } else if (error.response && error.response.status === 500) {
                        setErrorMessage('Server error.');
                    }
                }
            }

            setIsLoadingRearrange(false);
        } else {
            setErrorMessage('Please select new start and end dates.');
        }
    };

    const handleFinishElection = async () => {
        try {
            setFinishElectionLoading(true);
            const currentDate = new Date();
            const startDateObj = new Date(election.start_time);

            if (currentDate < startDateObj) {
                setErrorMessage('The election has not started yet.You cannot click this button');
            } else {
                const response = await api.post('/election/end-election', {
                    departmentId: user.departmentID,
                });

                if (response.status === 200) {
                    setErrorMessage('');
                    setStartDate(null);
                    setEndDate(null);
                    navigation('/dashboard');
                }
            }
        } catch (error) {
            if (error.response && error.response.message === 400) {
                setErrorMessage(error.response.message);
            } else {
                setErrorMessage('An error occurred while finishing the election.');
            }
        } finally {
            setFinishElectionLoading(false);
        }
    };


    const handleCancelElection = async () => {
        try {
            setIsLoadingCancel(true);
            const response = await api.delete(`/election/department/${user.departmentID}`);
            if (response.status === 200) {
                setErrorMessage('');
                setStartDate(null);
                setEndDate(null);
                navigation('/dashboard');
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setErrorMessage('Bad request.');
            } else if (error.response && error.response.status === 500) {
                setErrorMessage('Server error.');
            }
        }
        setIsLoadingCancel(false);
    };
    if (election && election.start_time && election.end_time) {
        if (isInitialized) {
            return (
                <div className="rearrange-page-container">
                    <Sidebar roleActionArray={roleActionArray} userRole={'admin'}></Sidebar>
                    <div className='rearrange-page-content-wrapper'>
                        <div className="rearrange-date-container">
                            <h2 id="rearrange-h2">Rearrange/Cancel Election Date</h2>
                            <div className="date-container">
                                <div className="date-label">Current Start Date:</div>
                                <div className="current-date">{election.start_time ? new Date(election.start_time).toDateString() : ''}</div>
                                <div className="date-label">Current End Date:</div>
                                <div className="current-date">{election.end_time ? new Date(election.end_time).toDateString() : ''}</div>
                                <button
                                    onClick={handleFinishElection}
                                    className='finish-election-btn'
                                    disabled={candidates.length === 0 || finishElectionLoading || new Date() < new Date(election.start_time)}
                                >{finishElectionLoading ? (<SpinnerCircularFixed size={15} thickness={150} speed={100} color="rgba(255, 255, 255, 1)" secondaryColor="rgba(0, 0, 0, 0)" />) : 'Finish Election'}</button>
                            </div>
                        </div>

                        <div className="calendars-container">
                            <div className="date-picker-container">
                                <p id="announce-p">New Start Date</p>
                                <DatePicker
                                    className="react-datepicker"
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    minDate={today}
                                    dateFormat="dd/MM/yyyy"
                                    showYearDropdown
                                    scrollableYearDropdown
                                    yearDropdownItemNumber={15}
                                    todayButton="Today"
                                    placeholderText="Select start date"
                                />
                            </div>
                            <div className="date-picker-container">
                                <p id="announce-p">New End Date</p>
                                <DatePicker
                                    className="react-datepicker"
                                    selected={endDate}
                                    onChange={(date) => setEndDate(date)}
                                    minDate={today}
                                    dateFormat="dd/MM/yyyy"
                                    showYearDropdown
                                    scrollableYearDropdown
                                    yearDropdownItemNumber={15}
                                    todayButton="Today"
                                    placeholderText="Select end date"
                                />
                            </div>
                        </div>
                        {errorMessage && <div className="error-message-rearrange-page">{errorMessage}</div>}
                        <div className="button-container">
                            <button
                                id="rearrange-button"
                                onClick={handleRearrangeDate}
                                disabled={!startDate || !endDate}
                            >
                                {isLoadingRearrange ? <SpinnerCircularFixed size={30} color="#fff" /> : 'Rearrange Date'}
                            </button>
                            <button id="cancel-button" onClick={handleCancelElection}>
                                {isLoadingCancel ? <SpinnerCircularFixed size={30} color="#fff" /> : 'Cancel Election'}
                            </button>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className="rearrange-page-container">
                    <Sidebar roleActionArray={roleActionArray} userRole={'admin'}></Sidebar>
                    <div className="rearrange-date-container">
                        <h2 id="rearrange-h2">Rearrange/Cancel Election Date</h2>
                    </div>
                </div>

            );
        }
    } else {

        return (
            <div className="rearrange-page-container">
                <Sidebar roleActionArray={roleActionArray} userRole={'admin'}></Sidebar>
                <div className="rearrange-date-container">
                    <h2 id="rearrange-h2">Rearrange/Cancel Election Date</h2>
                    {isInitialized ? <p>No active election has been initiated in this department. If you want to start an election, go to the announce election date page.</p> : null}
                </div>
            </div>

        );
    }

}