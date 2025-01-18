// src/utils/validation.js
export const validateInterview = (formData, interviews, isEdit) => {
    const errors = {};
    const { candidateName, interviewerName, date, timeSlot } = formData;
  
 
    const interviewerConflict = interviews.find(i => 
      i.interviewerName === interviewerName &&
      i.date === date &&
      i.timeSlot === timeSlot &&
      (!isEdit || i.id !== formData.id)
    );
  
    if (interviewerConflict) {
      errors.interviewerName = 'Interviewer is already booked for this time slot.';
    }
  
  
    const candidateConflict = interviews.find(i => 
      i.candidateName === candidateName &&
      i.date === date &&
      i.timeSlot === timeSlot &&
      (!isEdit || i.id !== formData.id)
    );
  
    if (candidateConflict) {
      errors.candidateName = 'Candidate already has an interview at this time.';
    }
  
    return errors;
  };
  