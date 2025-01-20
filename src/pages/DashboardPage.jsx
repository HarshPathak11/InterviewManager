import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { deleteInterview } from '../redux/interviewsSlice';
import { Link } from 'react-router-dom';
import Notification from '../components/Notification/Notification';
import CalendarView from '../components/Calender/CalendarView';
import Steps from '../components/Steps/Steps';

const Container = styled.div`
  padding: 2rem;
  min-height: 100vh;
  @media (max-width: 768px) {
    padding:0.5rem
  }
  
`;

const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background: #ffffff; 
  border: 1px solid #e0e0e0; 
  border-radius: 8px; 
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 

  select, input {
    padding: 0.75rem 1rem;
    border: 1px solid #ddd; 
    border-radius: 6px; 
    font-size: 1rem;
    color: #333;
    background: #f9f9f9; 
    transition: border-color 0.3s ease, box-shadow 0.3s ease;

    &:focus {
      border-color: #4a90e2; 
      box-shadow: 0 0 4px rgba(74, 144, 226, 0.6); 
      outline: none;
    }
  }

  @media (max-width: 600px) {
    flex-direction: column;

    select, input {
      width: 100%; 
    }
  }

  select:hover, input:hover {
    border-color: #b3b3b3; 
  }
`;


const InterviewList = styled.table`
  width: 100%;
  border-collapse: collapse;
  overflow-x: auto;
  color:white;

  @media (max-width: 768px) {
    display: block;
    overflow-x: scroll;
    white-space: nowrap;
  }

  th, td {
    padding: 0.75rem;
    border: 1px solid #ddd;
    text-align: left;
  }

  th {
    background:rgb(43, 57, 71);
  }

  tr:nth-child(even) {
    background:rgb(60, 74, 88);;
  }
  tr:nth-child(odd) {
    background:rgb(94, 115, 136);;
  }
`;

const Button = styled.button`
  background: ${props => props.delete ? '#e74c3c' : '#4a90e2'};
  color: #fff;
  border: none;
  font-style:Jost;
  font-weight: 800;
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: ${props => props.delete ? '#c0392b' : '#357ab8'};
  }
`;

const ToggleButton = styled.button`
  position: relative;
  background: ${props => (props.active ? '#4a90e2' : '#e74c3c')};
  color: #fff;
  border: none;
  padding: 0.5rem 2.5rem;
  border-radius: 30px;
  cursor: pointer;
  overflow: hidden;
  font-size: 1rem;
  font-weight: bold;
  transition: background 0.4s ease, transform 0.2s ease;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;

`;

const ToggleCircle = styled.div`
  position: absolute;
  top: 50%;
  left: ${props => (props.active ? 'calc(100% - 2rem)' : '0.5rem')};
  transform: translateY(-50%);
  width: 1.5rem;
  height: 1.5rem;
  background: #fff;
  border-radius: 50%;
  transition: left 0.4s ease;
`;

const DashboardPage = () => {
  const dispatch = useDispatch();
  const [view, setView] = useState("list");
  const interviews = useSelector(state => state.interviews.interviews);
  const [filters, setFilters] = useState({
    date: '',
    interviewer: '',
    candidate: '',
  });
  const [notification, setNotification] = useState(null);

  const handleDelete = id => {
    if (window.confirm('Are you sure you want to delete this interview?')) {
      dispatch(deleteInterview(id));
      setNotification({ message: 'Interview deleted successfully!', type: 'success' });
    }
  };

  const handleFilterChange = e => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredInterviews = interviews.filter(i => {
    return (
      (filters.date ? i.date === filters.date : true) &&
      (filters.interviewer ? i.interviewerName.toLowerCase().includes(filters.interviewer.toLowerCase()) : true) &&
      (filters.candidate ? i.candidateName.toLowerCase().includes(filters.candidate.toLowerCase()) : true)
    );
  });
 

  return (
    <Container className='grainy-dark'>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <Steps view={view}/>
      <h2>Scheduled Interviews</h2>
      <ToggleButton
        active={view === "cal"}
        onClick={() => setView(view === "list" ? "cal" : "list")}
      >
        <ToggleCircle active={view === "cal"} />
        {view === "list" ? "List View" : "Calendar View"}
      </ToggleButton>
      {view === "list" && (
        <>
          <Filters>
            <input
              type="date"
              name="date"
              value={filters.date}
              onChange={handleFilterChange}
              placeholder="Filter by Date"
            />
            <input
              type="text"
              name="interviewer"
              value={filters.interviewer}
              onChange={handleFilterChange}
              placeholder="Filter by Interviewer"
            />
            <input
              type="text"
              name="candidate"
              value={filters.candidate}
              onChange={handleFilterChange}
              placeholder="Filter by Candidate"
            />
          </Filters>
          <InterviewList>
            <thead>
              <tr>
                <th>Candidate Name</th>
                <th>Interviewer Name</th>
                <th>Date</th>
                <th>Time Slot</th>
                <th>Interview Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInterviews.length > 0 ? (
                filteredInterviews.map(interview => (
                  <tr key={interview.id}>
                    <td>{interview.candidateName}</td>
                    <td>{interview.interviewerName}</td>
                    <td>{interview.date}</td>
                    <td>{(() => {
                      const startTime = interview.timeSlot;
                      const durationMinutes = interview.duration;


                      const [hours, minutes] = startTime.split(":").map(Number);


                      const startDate = new Date();
                      startDate.setHours(hours, minutes);

                      const endDate = new Date(startDate.getTime() + durationMinutes * 60000);

                      const endTime = endDate.toTimeString().slice(0, 5);

                      return `${startTime} - ${endTime}`;
                    })()}</td>
                    <td>{interview.interviewType}</td>
                    <td>
                      <Link to={`/edit/${interview.id}`}>
                        <Button>Edit</Button>
                      </Link>
                      <Button delete onClick={() => handleDelete(interview.id)}>Delete</Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center' }}>No interviews scheduled.</td>
                </tr>
              )}
            </tbody>
          </InterviewList>
        </>
      )}
      {view === "cal" && <CalendarView />}
    </Container>
  );
};

export default DashboardPage;
