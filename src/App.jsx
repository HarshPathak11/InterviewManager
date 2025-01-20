// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import CreateInterviewPage from './pages/CreateInterviewPage';
import EditInterviewPage from './pages/EditInterviewPage';
import Navbar from './components/Navbar/Navbar';
import EmailDashboard from './components/EmailDashboard/EmailDashboard';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/create" element={<CreateInterviewPage />} />
        <Route path="/edit/:id" element={<EditInterviewPage />} />
        <Route path="/email" element={<EmailDashboard/>} />
      </Routes>
    </Router>
  );
};

export default App;
