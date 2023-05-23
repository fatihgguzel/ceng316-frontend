import React, { useContext, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './AnnounceElectionDatePage.css';
import Sidebar from '../MainPage/SideBar';
import { UserContext } from '../../Providers/context';
import { roleActionArray } from '../../db_mock/IOES_db';
import { useNavigate } from 'react-router-dom';
export default function AnnounceElectionDate() {
  const {user} = useContext(UserContext);
  const navigation=useNavigate();

  useEffect(()=>{
    if(!user?.role==="admin"){
     navigation('/');
    }
  },[])

  const today = new Date();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAnnounceDate = () => {
    if (startDate >= endDate) {
      setErrorMessage("The start day of the election cannot be the same day as the end date or later.");
    } else if (startDate && endDate) {
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);

      const timeDiff = Math.abs(endDateObj.getTime() - startDateObj.getTime());
      const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

      if (diffDays > 30) {
        setErrorMessage('Date range is incorrect. 30 days is the maximum permitted period.');
      } else {
        console.log('Announcing election dates:', startDateObj, endDateObj);
      }
    } else {
      setErrorMessage('Please select start and end dates');
    }
  };

  return (
  <div style={{display:'flex', flexDirection:'column'}}>
     <Sidebar roleActionArray={roleActionArray} userRole={"admin"}>
   </Sidebar>
    <div className="announce-date-container">
    <h2 id='announce-h2'>Announce Election Date</h2>
    <div className="calendars-container">
      <div className="date-picker-container">
        <p id='announce-p'>Start Date</p>
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
        <p id='announce-p'>End Date</p>
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
    <button id='se-button' onClick={handleAnnounceDate} disabled={!startDate || !endDate}>
      Start Election
    </button>
    {errorMessage  && <p className="error-message-announce-page">{errorMessage}</p>}
  </div>
  </div>
  );
}