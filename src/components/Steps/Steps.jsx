import React from 'react';
import styled from 'styled-components';
// import cn from 'classnames';

const STEPS = [
  {
    name: 'Mode I : List View',
    description: 'View interviews in a list format with robust customisation options',
    imgPath: '/snake-1.png',
    id: 'list',
  },
  {
    name: 'Mode II : Calendar View',
    description: 'View interviews in a calendar format with draggable GUI based rescheduling',
    imgPath: '/snake-2.png',
    id: 'calendar',
  },
];

const StepsContainer = styled.ol`
  display: flex;
  flex-direction: row;
  justify-content: center;
  background: rgb(43, 57, 71);
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  overflow: hidden;

  @media (max-width:500px){
    flex-direction:column;
  }
`;

const StepItem = styled.li`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  text-align: center;
  background: ${(props) => (props.isActive ? '#e2e8f0' : 'white')};
  border-left: ${(props) => (props.isFirst ? 'none' : '1px solid #e5e7eb')};
  transition: background 0.3s ease;

  &:hover {
    background: #f1f5f9;
  }

  img {
    height: 60px;
    width: 60px;
    object-fit: contain;
    margin-bottom: 0.5rem;
  }

  .step-name {
    font-size: 1rem;
    font-weight: bold;
    color: ${(props) => (props.isActive ? '#1e293b' : '#64748b')};
  }

  .step-description {
    font-size: 0.875rem;
    color: #94a3b8;
  }
`;

const Steps = ({ view }) => {
  return (
    <StepsContainer>
      {STEPS.map((step, index) => {
        const isActive = (view === 'list' && step.id === 'list') || (view === 'cal' && step.id === 'calendar');
        return (
          <StepItem key={step.name} isActive={isActive} isFirst={index === 0}>
            <img src={step.imgPath} alt={`${step.name} icon`} />
            <span className="step-name">{step.name}</span>
            <span className="step-description">{step.description}</span>
          </StepItem>
        );
      })}
    </StepsContainer>
  );
};

export default Steps;