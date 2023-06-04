import React, { useContext, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './AnnounceElectionDatePage.css';
import Sidebar from '../../components/sidebar/SideBar';
import { UserContext } from '../../Providers/context';
import { roleActionArray } from '../../db_mock/IOES_db';
import { useNavigate } from 'react-router-dom';
import api from '../../Providers/api';

export default function AnnounceElectionDatePage() {
  const { user } = useContext(UserContext);
  const navigation = useNavigate();

  const today = new Date();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!user?.role === 'admin') {
      navigation('/');
    }
  }, []);

  const handleAnnounceDate = async () => {
    if (startDate && endDate) {
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);

      if (startDateObj >= endDateObj) {
        setErrorMessage('The start day of the election cannot be the same day as the end date or later.');
      } else {
        try {
          const response = await api.post('/election/announce-election-date', {
            startDate: formatDate(startDateObj),
            endDate: formatDate(endDateObj),
            departmentId: user.departmentID,
          });

          if (response.status === 201) {
            setErrorMessage('');
            setStartDate(null);
            setEndDate(null);
            alert('Election created.');
            navigation('/');
          } else if (response.status === 400) {
            setErrorMessage('Bad request.');
          } else if (response.status === 500) {
            setErrorMessage('Server error.');
          }
        } catch (error) {
          setErrorMessage('An error occurred while creating the election.');
          console.log(error);
        }
      }
    } else {
      setErrorMessage('Please select start and end dates');
    }
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

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
          Start Election
        </button>
        {errorMessage && <p className="error-message-announce-page">{errorMessage}</p>}
      </div>
    </div>
  );
}
