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
    margin: 1rem;
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

  
  const events = interviews.map(interview => ({
    id: interview.id,
    title: `${interview.candidateName} (${interview.interviewType})`,
    start: `${interview.date}T${interview.timeSlot}`,
    end: new Date(new Date(`${interview.date}T${interview.timeSlot}`).getTime() + 30 * 60000).toISOString(), 
    extendedProps: {
      interviewerName: interview.interviewerName,
      candidateName: interview.candidateName,
      interviewType: interview.interviewType,
    },
  }));

 
  const handleEventDrop = (info) => {
    const { event } = info;
    const updatedInterview = {
      id: event.id,
      candidateName: event.extendedProps.candidateName,
      interviewerName: event.extendedProps.interviewerName,
      interviewType: event.extendedProps.interviewType,
      date: event.start.toISOString().split('T')[0],
      timeSlot: event.start.toTimeString().split(':').slice(0, 2).join(':'),
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

