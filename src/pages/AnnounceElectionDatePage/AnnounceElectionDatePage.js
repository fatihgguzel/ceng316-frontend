import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './AnnounceElectionDatePage.css';

const AnnounceElectionDate = () => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
    setErrorMessage('');
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
    setErrorMessage('');
  };

  const handleAnnounceDate = () => {
    if (selectedStartDate && selectedEndDate) {
      const startDate = new Date(selectedStartDate);
      const endDate = new Date(selectedEndDate);

      const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
      const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

      if (diffDays > 30) {
        setErrorMessage('Date range is incorrect. 30 days is the maximum permitted period.');
      } else {
        console.log('Announcing election dates:', selectedStartDate, selectedEndDate);
      }
    } else {
      setErrorMessage('Please select start and end dates');
    }
  };

  return (
    <div className="announce-date-container">
      <h2>Announce Election Date</h2>
      <div className="calendars-container">
        <div className="date-picker-container">
          <p>Start Date</p>
          <Calendar
            className="react-calendar"
            onChange={handleStartDateChange}
            value={selectedStartDate}
          />
        </div>
        <div className="date-picker-container">
          <p>End Date</p>
          <Calendar
            className="react-calendar"
            onChange={handleEndDateChange}
            value={selectedEndDate}
          />
        </div>
      </div>
      <button onClick={handleAnnounceDate} disabled={!selectedStartDate || !selectedEndDate}>
        Start Election
      </button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default AnnounceElectionDate;