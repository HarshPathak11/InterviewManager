// src/pages/EditInterviewPage.jsx
import React from 'react';
import InterviewForm from '../components/InterviewForm/InterviewForm';

const EditInterviewPage = () => {
  return (
    <div style={{paddingTop:'20px'}}>
      <InterviewForm isEdit />
    </div>
  );
};

export default EditInterviewPage;
