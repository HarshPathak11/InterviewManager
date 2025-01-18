import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { deleteInterview } from '../redux/interviewsSlice';
import { Link } from 'react-router-dom';
import Notification from '../components/Notification/Notification';
import CalendarView from '../components/DashBoard/CalendarView';

const Container = styled.div`
  padding: 2rem;
`;

const Filters = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;

  select, input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

const InterviewList = styled.table`
  width: 100%;
  border-collapse: collapse;
  overflow-x: auto;

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
    background: #f4f6f8;
  }

  tr:nth-child(even) {
    background: #fafafa;
  }
`;

const Button = styled.button`
  background: ${props => props.delete ? '#e74c3c' : '#4a90e2'};
  color: #fff;
  border: none;
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
    <Container>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
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
                    <td>{interview.timeSlot}</td>
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
