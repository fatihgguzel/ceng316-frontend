import React, { useContext, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './AnnounceElectionDatePage.css';
import Sidebar from '../../components/sidebar/SideBar';
import { UserContext } from '../../Providers/context';
import { roleActionArray } from '../../db_mock/IOES_db';
import { useNavigate } from 'react-router-dom';
import api from '../../Providers/api';
import { SpinnerCircularFixed } from 'spinners-react';




export default function AnnounceElectionDatePage() {
  const { user } = useContext(UserContext);
  const navigation = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const today = new Date();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [election, setElection] = useState(null);
  const [isInitialized, setInitialized] = useState(false);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (!user?.role === 'admin') {
      navigation('/');
    } else {
      fetchElectionByDepartmentId();
    }
  }, []);

  const fetchElectionByDepartmentId = async () => {

    try {
      const response = await api.get(`/election/department/${user.departmentID}`);
      if (response.status === 200) {
        setElection(response.data);

      }
    } catch (error) {
      if (error.response.status === 404) {
        setElection(null);
      } else if (error.response.status === 500) {
        setErrorMessage('Server error.');
      }
    }
    finally {
      setInitialized(true)
    }
  };

  const handleAnnounceDate = async () => {
    if (startDate && endDate) {
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);
      const diffInDays = Math.floor((endDateObj - startDateObj) / (1000 * 60 * 60 * 24));

      if (startDateObj >= endDateObj) {
        setErrorMessage('The start day of the election cannot be the same day as the end date or later.');
      }
      else if (diffInDays > 60) {
        setErrorMessage('The period between the start date and end date cannot exceed 60 days.');
      }

      else {
        try {
          setIsLoading(true);
          const response = await api.post('/election/announce-election-date', {
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
          if (error.response.status === 400) {
            setErrorMessage('Bad request.');
          } else if (error.response.status === 500) {
            setErrorMessage('Server error.');
          }
        }
      }

      setIsLoading(false);
    } else {
      setErrorMessage('Please select start and end dates');
    }

  };


  if (election && election.start_time && election.end_time) {

    if (isInitialized) {
      return (
        <div className="announce-page-container">
          <Sidebar roleActionArray={roleActionArray} userRole={'admin'}></Sidebar>
          <div className="announce-date-container">
            <h2 id="announce-h2">Announce Election Date</h2>
            <p>Election has already started in this department. If you want to change the election start and end dates, go to the rearrange page.</p>
          </div>
        </div>
      );
    }
    else {
      return (
        <div className="announce-page-container">
          <Sidebar roleActionArray={roleActionArray} userRole={'admin'}></Sidebar>
          <div className="announce-date-container">
            <h2 id="announce-h2">Announce Election Date</h2>
          </div>
        </div>
      );

    }
  }

  else {
    if (isInitialized) {
      return (
        <div className="announce-page-container">
          <Sidebar roleActionArray={roleActionArray} userRole={'admin'}></Sidebar>
          <div className="announce-date-container">
            <h2 id="announce-h2">Announce Election Date</h2>
            <div className="calendars-container">
              <div className="date-picker-container">
                <p id="announce-p">Start Date</p>
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
                <p id="announce-p">End Date</p>
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
            <button
              id="se-button"
              onClick={handleAnnounceDate}
              disabled={!startDate || !endDate}
            >
              {isLoading ? <SpinnerCircularFixed color="#ffffff" size={18} thickness={100} /> : 'Start Election'}
            </button>
            {errorMessage && <p className="error-message-announce-page">{errorMessage}</p>}
          </div>
        </div>
      );
    }
    else {
      return (
        <div className="announce-page-container">
          <Sidebar roleActionArray={roleActionArray} userRole={'admin'}></Sidebar>
          <div className="announce-date-container">
            <h2 id="announce-h2">Announce Election Date</h2>
          </div>
        </div>
      );
    }

  }
}