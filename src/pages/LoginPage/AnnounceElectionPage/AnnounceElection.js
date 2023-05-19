import React, { useState } from 'react';

export default function HeadOfDepartmentPage() {
  const [electionDate, setElectionDate] = useState('');
  const [electionTime, setElectionTime] = useState('');

  const handleAnnounceDate = () => {
cd
    const announcementData = {
      date: electionDate,
      time: electionTime,
    };
  
    fetch('your-api-endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(announcementData),
    })
      .then(response => {
        if (response.ok) {
          // Handle success scenario
          console.log('Election date announced successfully');
          // You can redirect the user to the main page or display a success message here
        } else {
          // Handle error scenario
          throw new Error('Failed to announce election date');
        }
      })
      .catch(error => {
        // Handle error scenario
        console.error(error);
        // You can display an error message to the user here
      });
  };

  return (
    <div>
      <h2>Announce Election Date</h2>
      <div>
        <label>Date:</label>
        <input type="date" value={electionDate} onChange={(e) => setElectionDate(e.target.value)} />
      </div>
      <div>
        <label>Time:</label>
        <input type="time" value={electionTime} onChange={(e) => setElectionTime(e.target.value)} />
      </div>
      <button onClick={handleAnnounceDate}>Announce Date</button>
    </div>
  );
}