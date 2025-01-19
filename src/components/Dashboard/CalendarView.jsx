// src/components/Dashboard/CalendarView.jsx
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; 
import timeGridPlugin from '@fullcalendar/timegrid'; 
import interactionPlugin from '@fullcalendar/interaction'; 
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { updateInterview } from '../../redux/interviewsSlice';
import { validateInterview } from '../../utils/validation';
import { Link } from 'react-router-dom';
import Notification from '../Notification/Notification';

const CalendarContainer = styled.div`
  max-width: 1000px;
  margin: 2rem auto;

  @media (max-width: 768px) {
    margin: 0.2rem;
    .fc { 
    font-size: 0.9rem; /* Adjust font size for smaller screens */
  }
  .fc-toolbar {
    flex-wrap: wrap; /* Allow toolbar to wrap on smaller screens */
    justify-content: center;
  }

  .fc-toolbar-chunk {
    margin-bottom: 0.5rem; /* Add spacing between wrapped toolbar elements */
  }

  .fc .fc-daygrid-day {
    font-size: 0.75rem; /* Smaller font for day cells */
  }

  .fc .fc-timegrid-event {
    font-size: 0.8rem; /* Smaller font for events */
  }
  .fc-header-toolbar {
    flex-direction: column;
    align-items: center;
  }
  }
  
`;

const DetailsModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  z-index: 1000;
`;

const DetailsModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 90%;
  max-width: 500px;
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  transform: translate(-50%, -50%);

  @media (max-width: 768px) {
    padding: 1rem;
  }

  button {
    margin: 0.5rem;
    padding: 0.5rem 1rem;
    border: none;
    background: #4a90e2;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background: #357ab8;
    }
  }
`;

const DetailsModal = ({ children, onClose }) => (
  <DetailsModalOverlay onClick={onClose}>
    <DetailsModalContent onClick={e => e.stopPropagation()}>
      {children}
    </DetailsModalContent>
  </DetailsModalOverlay>
);


const CalendarView = () => {
  const dispatch = useDispatch();
  const interviews = useSelector(state => state.interviews.interviews);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [notification, setNotification] = useState(null); 
  console.log(interviews);

  
  const events = interviews.map(interview => {
    const startDateTimeString = `${interview.date}T${interview.timeSlot}`;
    
    // Debugging Logs
    console.log('Start Date-Time String:', startDateTimeString);
    console.log('Interview Duration:', interview.duration);
    
    const startDate = new Date(startDateTimeString);
    console.log('Parsed Start Date:', startDate);
    
    const endTime = startDate.getTime() + interview.duration * 60000;
    console.log('Calculated End Time (ms):', endTime);
    
    const endDate = new Date(endTime);
    console.log('Parsed End Date:', endDate);
    
    const endISOString = endDate.toISOString();
    console.log('End ISO String:', endISOString);
    
    return {
      id: interview.id,
      title: `${interview.candidateName} (${interview.interviewType})`,
      start: startDate.toISOString(),
      end: endISOString,
      extendedProps: {
        interviewerName: interview.interviewerName,
        candidateName: interview.candidateName,
        interviewType: interview.interviewType,
        duration: interview.duration,
      },
    };
  }).filter(event => event !== null); // Ensure no null events
  

 
  const handleEventDrop = (info) => {
    const { event } = info;
    const updatedInterview = {
      id: event.id,
      candidateName: event.extendedProps.candidateName,
      interviewerName: event.extendedProps.interviewerName,
      interviewType: event.extendedProps.interviewType,
      date: event.start.toISOString().split('T')[0],
      timeSlot: event.start.toTimeString().split(':').slice(0, 2).join(':'),
      duration: event.extendedProps.duration, // Retain the original duration
    };

    
    const otherInterviews = interviews.filter(i => i.id !== updatedInterview.id);

   
    const validationErrors = validateInterview(updatedInterview, otherInterviews, true);

    if (Object.keys(validationErrors).length > 0) {
     
      info.revert();

     
      setNotification({ message: 'Scheduling conflict detected. Please choose a different time.', type: 'error' });

      return;
    }

    dispatch(updateInterview(updatedInterview));

    
    setNotification({ message: 'Interview rescheduled successfully!', type: 'success' });
  };

 
  const handleEventClick = (info) => {
    setSelectedEvent(info.event);
    setShowDetails(true);
  };

 
  const closeDetails = () => {
    setShowDetails(false);
    setSelectedEvent(null);
  };

  

  return (
    <CalendarContainer>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        events={events}
        editable={true} 
        selectable={true}
        eventDrop={handleEventDrop} 
        eventClick={handleEventClick} 
        height="auto"
      />

      {showDetails && selectedEvent && (
        <DetailsModal onClose={closeDetails}>
          <h3>Interview Details</h3>
          <p><strong>Candidate:</strong> {selectedEvent.extendedProps.candidateName}</p>
          <p><strong>Interviewer:</strong> {selectedEvent.extendedProps.interviewerName}</p>
          <p><strong>Type:</strong> {selectedEvent.extendedProps.interviewType}</p>
          <p><strong>Date:</strong> {selectedEvent.start.toISOString().split('T')[0]}</p>
          <p><strong>Time:</strong> {selectedEvent.start.toTimeString().split(':').slice(0, 2).join(':')}</p>
          <p><strong>Duration:</strong> {selectedEvent.extendedProps.duration} minutes</p>
          <button onClick={closeDetails}>Close</button>
          <Link to={`/edit/${selectedEvent.id}`}>
            <button>Edit</button>
          </Link>
        </DetailsModal>
      )}

      {/* Optional: Notification Component */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </CalendarContainer>
  );
};

export default CalendarView;

