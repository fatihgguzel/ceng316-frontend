import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './AnnounceElectionDatePage.css';

const AnnounceElectionDate = () => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };

  const handleAnnounceDate = () => {
    if (selectedStartDate && selectedEndDate) {
      // Logic to announce the election date range
      console.log('Announcing election dates:', selectedStartDate, selectedEndDate);
    } else {
      console.log('Please select start and end dates');
    }
  };

  return (
    <div className="announce-date-container">
      <h2>Announce Election Date</h2>
      <div className="calendars-container">
        <div className="date-picker-container">
          <Calendar
            className="react-calendar"
            onChange={handleStartDateChange}
            value={selectedStartDate}
          />
        </div>
        <div className="date-picker-container">
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
    </div>
  );
};

export default AnnounceElectionDate;