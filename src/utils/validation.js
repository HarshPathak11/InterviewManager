
  
// src/utils/validation.js

import { INTERVIEW_DURATION_MINUTES, OPERATIONAL_START_HOUR, OPERATIONAL_END_HOUR } from '../constants';


const getDateTime = (date, time) => {
  return new Date(`${date}T${time}`);
};


const isOverlapping = (start1, end1, start2, end2) => {
  return start1 < end2 && start2 < end1;
};


export const validateInterview = (formData, interviews, isEdit) => {
  const errors = {};
  const { id, candidateName, interviewerName, date, timeSlot, duration } = formData;

  const newStart = getDateTime(date, timeSlot);
  const newEnd = new Date(newStart.getTime() + duration * 60000);

  // Check if interview is within operational hours
  const interviewStartHour = newStart.getHours();
  const interviewEndHour = newEnd.getHours() + (newEnd.getMinutes() > 0 ? 1 : 0);

  if (
    interviewStartHour < OPERATIONAL_START_HOUR ||
    interviewEndHour > OPERATIONAL_END_HOUR ||
    (interviewEndHour === OPERATIONAL_END_HOUR && newEnd.getMinutes() > 0)
  ) {
    errors.timeSlot = `Interviews can only be scheduled between ${OPERATIONAL_START_HOUR}:00 and ${OPERATIONAL_END_HOUR}:00.`;
    return errors;
  }

  // Iterate over existing interviews to check for conflicts
  for (let interview of interviews) {
    // If editing, skip the current interview
    if (isEdit && interview.id === id) continue;

    const existingStart = getDateTime(interview.date, interview.timeSlot);
    const existingEnd = new Date(existingStart.getTime() + interview.duration * 60000);

    // Check for interviewer conflicts
    if (interview.interviewerName === interviewerName) {
      if (isOverlapping(newStart, newEnd, existingStart, existingEnd)) {
        errors.interviewerName = `Interviewer is already booked from ${existingStart.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} to ${existingEnd.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.`;
        break; // No need to check further if conflict is found
      }
    }

    // Check for candidate conflicts
    if (interview.candidateName === candidateName) {
      if (isOverlapping(newStart, newEnd, existingStart, existingEnd)) {
        errors.candidateName = `Candidate already has an interview from ${existingStart.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} to ${existingEnd.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.`;
        break; // No need to check further if conflict is found
      }
    }
  }

  return errors;
};
