
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { addInterview, updateInterview } from '../../redux/interviewsSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { validateInterview } from '../../utils/validation';
import Notification from '../Notification/Notification';
import { INTERVIEW_DURATION_MINUTES } from '../../constants';
import { sendNotification } from '../../utils/mockNotificationService';
const Container = styled.div`
  display: flex;
  height: 100vh;
  background:rgb(3, 30, 51);

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }
`;

{/* <img data-v-83bd8314="" src="https://app.svgator.com/assets/svgator.webapp/log-in-girl.svg" width="600" /> */}
const LeftSection = styled.div`
  flex: 1;
  width:600px;
  background: url("https://app.svgator.com/assets/svgator.webapp/log-in-girl.svg") center/cover no-repeat;
  position: relative;

  @media (max-width: 768px) {
    height: 200px;
  }

  
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Form = styled.form`
  max-width: 500px;
  width: 100%;
  padding: 1rem;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
  .shape-top-right {
    display:flex;
    justify-content:end;
  }

  .shape-bottom-left {
    display:flex;
    justify-content:start;
    margin-top:10px;
  }
`;

const Field = styled.div`
  margin-bottom: 0.5rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
    font-size: 0.9rem;
    color: #333;
  }

  input, select {
    width: 100%;
    padding: 0.75rem;
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
`;

const Button = styled.button`
  display: block;
  width: 100%;
  background: #4a90e2;
  color: #fff;
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #357ab8;
  }
`;

const Error = styled.p`
  color: red;
  font-size: 0.9rem;
`;

const InterviewForm = ({ isEdit = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const interviews = useSelector((state) => state.interviews.interviews);
  const [notification, setNotification] = useState(null);
  const [formData, setFormData] = useState({
    candidateName: '',
    interviewerName: '',
    date: '',
    timeSlot: '',
    interviewType: 'Technical',
    duration: INTERVIEW_DURATION_MINUTES, 
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEdit && id) {
      const interview = interviews.find((i) => i.id === id);
      if (interview) {
        setFormData(interview);
      }
    }
  }, [isEdit, id, interviews]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev,[name]: name === 'duration' ? parseInt(value) : value}));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const interviewData = {
      ...formData,
      id: isEdit ? id : Date.now().toString(),
    };

    // Validate the interview
    const otherInterviews = isEdit
      ? interviews.filter(i => i.id !== id)
      : interviews;

    const validationErrors = validateInterview(interviewData, otherInterviews, isEdit);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setNotification({ message: 'OOPS ! TRY AGAIN.', type: 'error' });
      return;
    }

    if (isEdit) {
      dispatch(updateInterview(interviewData));
      setNotification({ message: 'Interview updated successfully!', type: 'success' });
    } else {
      dispatch(addInterview(interviewData));
      setNotification({ message: 'Interview scheduled successfully!', type: 'success' });
    }
    sendNotification({
      recipientName: interviewData.candidateName,
      recipientEmail: `${interviewData.candidateName.toLowerCase()}@example.com`,
      notificationType: `${isEdit?'Interview Updated':'Interview Scheduled'}`,
      interviewData: {
        date: interviewData.date,
        timeSlot: interviewData.timeSlot,
        duration: interviewData.duration,
        interviewerName: interviewData.interviewerName,
        interviewType: interviewData.interviewType,
      },
    });

    // Navigate back to dashboard after a short delay to allow the notification to display
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  return (
    <Container>
      <LeftSection>
        
      </LeftSection>
      <RightSection>
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}
        <Form onSubmit={handleSubmit}>
        <div className="shape-top-right" >
          <img style={{ height:'70px',
    width:'70px'}} src='/Group 21.png'/>
        </div>
          <Field>
            <label>Candidate Name</label>
            <input
              type="text"
              name="candidateName"
              value={formData.candidateName}
              onChange={handleChange}
              required
            />
            {errors.candidateName && <Error>{errors.candidateName}</Error>}
          </Field>

          <Field>
            <label>Interviewer Name</label>
            <input
              type="text"
              name="interviewerName"
              value={formData.interviewerName}
              onChange={handleChange}
              required
            />
            {errors.interviewerName && <Error>{errors.interviewerName}</Error>}
          </Field>

          <Field>
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
            {errors.date && <Error>{errors.date}</Error>}
          </Field>

          <Field>
            <label>Time Slot</label>
            <input
              type="time"
              name="timeSlot"
              value={formData.timeSlot}
              onChange={handleChange}
              required
            />
            {errors.timeSlot && <Error>{errors.timeSlot}</Error>}
          </Field>

          <Field>
            <label>Interview Type</label>
            <select
              name="interviewType"
              value={formData.interviewType}
              onChange={handleChange}
            >
              <option value="Technical">Technical</option>
              <option value="HR">HR</option>
              <option value="Behavioral">Behavioral</option>
            </select>
          </Field>
          <Field>
          <label>Duration (minutes)</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            min="15"
            step="15"
            required
          />
          {errors.duration && <Error>{errors.duration}</Error>}
        </Field>

          <Button type="submit">{isEdit ? 'Update Interview' : 'Schedule Interview'}</Button>

          <div className="shape-bottom-left" >
            <img style={{ height:'70px',
              width:'70px'}}  src='/Group 21.png'></img>
          </div>
        </Form>
      </RightSection>
    </Container>
  );
};

export default InterviewForm;

